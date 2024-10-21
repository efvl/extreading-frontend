import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Language } from "../../langs/models/Language";
import LangDropdown from "../../langs/components/LangDropdown";
import LangService from "../../langs/services/LangService";
import PageEditorForm from "./PageEditorForm";
import { Word } from "../../word/models/Word";
import { Book } from "../../book/models/Book";
import { Dictionary } from "../../dictionary/models/Dictionary";
import PageWord from "./PageWord";
import DictionaryService from "../../dictionary/services/DictionaryService";
import SearchDictionaryPanel from "../../dictionary/components/SearchDictionaryPanel";
import LangDropdownField from "../../langs/components/LangDropdownField";
import SearchBookPanel from "../../book/components/SearchBookPanel";
import { Link } from "react-router-dom";
import WordService from "../../word/services/WordService";
import { WordListDto } from "../../word/models/WordListDto";
import { WordSearchRequest } from "../../word/models/WordSearchRequest";
import { DictionaryStats } from "../../dictionary/models/DictionaryStats";


const PageEditorPanel = () => {

    const [langs, setLangs] = useState<Language[]>([]);
    const [pageWords, setPageWords] = useState<Word[]>([]);
    const [filterLang, setFilterLang] = useState<Language>({});
    const [filterTxt, setFilterTxt] = useState<string>("");
    const [inputPageText, setInputPageText] = useState<string>("");
    const [selectedBook, setSelectedBook] = useState<Book>({});
    const [selectedDictionary, setSelectedDictionary] = useState<Dictionary>({});
    const [isDictFound, setIsDictFound] = useState<boolean>(false);
    const [countInBook, setCountInBook] = useState<number>(0);
    const [isPageCreated, setIsPageCreated] = useState<boolean>(false);
    const [curPageNum, setCurPageNum] = useState<number>(0);
    const [curPageWord, setCurPageWord] = useState<Word>({});
    const [countInPage, setCountInPage] = useState<number>(0);
    const [prevPage, setPrevPage] = useState<Word[]>([]);

    const handleSelectLanguage = (e: String) => {
        let lang = langs.find(item => item.id == e);
        setFilterLang(lang);
    }

    useEffect(() => {
        loadLanguages();
    }, []);

    const loadLanguages = async () => {
        const response = await LangService.searchLanguages({});
        if(response.data?.length > 0){
            console.log(response.data)
            setLangs(response.data);
            setFilterLang(response.data[0]); 
        }
    }

    const getSymbolsString = async (txt:string) => {
        var chars = txt.split('');
        var result = "";
        chars.forEach((ch) => {
            result += ch.codePointAt(0).toString(16)
            result += " ";
        })
        return result;
    }

    let whitespaceChars = /\s/;
    let newLineChars = /\r|\n/g;
    let lastChars = /.+(\.|\?|\!)$/
    

    const parsePageText = async (inputText:string, pageNum:number) => {
        setInputPageText(inputText)
        setCurPageNum(pageNum)
        let pageWordsList = [];
        // setPageWords([])
        // pageWords.length = 0;

        let pageLines: String[] = inputText.split(newLineChars);
        pageLines.forEach((line:string, index:number) => {

            console.log(" " + index + " " + line);
            line = line.replace(/\u2014/g, ", ").replace("F I G U R E", "Figure");
            
            let lineWords = line.split(whitespaceChars);
            var lineChars = 0;
            lineWords.forEach((word:string, wIndex: number) => {
                let curWord = { 
                    book: selectedBook,
                    // dictionary: selectedDictionary,
                    pageNum: pageNum,
                    lineNum: index,
                    wordNum: wIndex,
                    original: word,
                    lineIndex: lineChars + word.length, 
                    txtContent: word.replace(/[\u0021-\u002c]|[\u002e-\u003f]|[\u201c-\u205e]/g, "").toLowerCase()
                } as Word
                pageWordsList.push(curWord);
                console.log(" " + wIndex + " " + word)
            })
        })
        setPageWords(pageWordsList);
    }

    const clickPageWordHandler = async (selectedWord:Word) => {
        setCurPageWord(selectedWord);
        console.log(getSymbolsString(selectedWord.original));
        var counts = 0;
        pageWords.forEach((w) => {
            if (w.txtContent == selectedWord.txtContent) {
                counts++;
            }
            w.isSelected = (w.txtContent == selectedWord.txtContent)
        })
        setCountInPage(counts);
        const response = await DictionaryService.searchDictionaryAndStats( 
            { languageId:filterLang.id, txtContent:selectedWord.txtContent, bookId:selectedBook.id } 
        );
        var result = response.data as DictionaryStats
        if(result && result.dictionary) {
            setSelectedDictionary(result.dictionary);
            setIsDictFound(true);
        } else {
            setSelectedDictionary({} as Dictionary);
            setIsDictFound(false);
        }
        setCountInBook(result.countInBook);
    }

    const clickPrevWordHandler = async (selectedWord:Word) => {
        console.log(getSymbolsString(selectedWord.original));
    }

    const onChangePageNumber = async (pageNumber:number) => {
        setCurPageNum(pageNumber);
    } 

    const submitDictionaryForm = async (e) => {
        selectedDictionary.language = filterLang;
        selectedDictionary.txtContent = curPageWord.txtContent;
        console.log(selectedDictionary)
        try {
            const response = await DictionaryService.addDictionary(selectedDictionary);
            console.log(response.data)
            setSelectedDictionary(response.data);
            setIsDictFound(true);
        } catch(e) {
            console.log(e.response);
        }
    }

    const linkDictionaryToWord = async () => {
        try {
            if(curPageWord && selectedBook && selectedDictionary){
                curPageWord.dictionary = selectedDictionary;
                const response = await WordService.editWord(curPageWord);
                console.log(response);
                setCurPageWord(response.data)
            } 
        } catch(e) {
            console.log(e.response);
        }
    }

    const createPageWords = async () => {
        try {
            if(pageWords.length > 0 && selectedBook) {
                setIsPageCreated(true)
                let data = { wordList:pageWords, pageNum:curPageNum, book:selectedBook} as WordListDto
                const response = await WordService.addWords(data);
                console.log(response);
            } 
        } catch(e) {
            console.log(e.response);
        }
        clearSelections();
    }

    const searchPrevPageWords = async () => {
        let prev = curPageNum - 1;
        searchPageWords(prev);
        searchPrevLast5Lines(prev - 1);
        clearSelections();
    }

    const searchNextPageWords = async () => {
        let next = curPageNum + 1;
        searchPageWords(next);
        searchPrevLast5Lines(next - 1);
        clearSelections();
    }

    const searchOnePageWords = async (pNum:number) => {
        searchPageWords(pNum);
        searchPrevLast5Lines(pNum - 1);
        clearSelections();
    }

    const searchPrevLast5Lines = async (pNum:number) => {
        try {
            if(pNum >=0 && selectedBook) {
                let searchData = { pageNum:pNum, bookId:selectedBook.id } as WordSearchRequest
                const response = await WordService.searchLast5Lines(searchData);
                console.log(response);
                let words = response.data as Word[]
                var lineIndex = 0;
                words.forEach((w) => {
                    if(w.wordNum == 0 || lineIndex > 88) {
                        lineIndex = 0;
                    }
                    w.lineIndex = lineIndex;
                    lineIndex += (w.original.length + 1);
                })
                setPrevPage(words);
            } else {
                setPrevPage([]);
            }
        } catch(e) {
            console.log(e.response);
        }
    }

    const searchPageWords = async (pNum:number) => {
        setCurPageNum(pNum);
        try {
            if(pNum >=0 && selectedBook) {
                let searchData = { pageNum:pNum, bookId:selectedBook.id } as WordSearchRequest
                const response = await WordService.searchPageWords(searchData);
                console.log(response);
                let words = response.data as Word[]
                var lineIndex = 0;
                words.forEach((w) => {
                    if(w.wordNum == 0 || lineIndex > 88) {
                        lineIndex = 0;
                    }
                    w.lineIndex = lineIndex;
                    lineIndex += (w.original.length + 1);
                })
                setPageWords(words)
            } 
        } catch(e) {
            console.log(e.response);
        }
    }

    const deletePageWords = async (pNum:number) => {
        setCurPageNum(pNum);
        try {
            if(pNum >=0 && selectedBook) {
                let searchData = { pageNum:pNum, bookId:selectedBook.id } as WordSearchRequest
                const response = await WordService.deletePageWords(searchData);
                console.log("deleted: " + response.data);
                setPageWords([])
            } 
        } catch(e) {
            console.log(e.response);
        }
        clearSelections();
    }

    const clearSelections = async () => {
        setSelectedDictionary({} as Dictionary);
        setCurPageWord({} as Word);
        setIsDictFound(false);
    }

    const handleSelectDictionary = (dictionary:Dictionary) => {
        setSelectedDictionary(dictionary)
    }

    const handleSelectBook = (book:Book) => {
        setSelectedBook(book)
    }

    return (
        <Container fluid className="m-3">
            <Row>
                <Col md={6} className="border">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Search Book</Accordion.Header>
                            <Accordion.Body>
                                <SearchBookPanel selectAction={handleSelectBook}></SearchBookPanel>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Input page</Accordion.Header>
                            <Accordion.Body>
                                <PageEditorForm curPageNum={curPageNum} onChangePageNumber={onChangePageNumber} submitAction={parsePageText}></PageEditorForm>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Row className="p-2" style={{ 'fontSize': '1.2em' }}>
                        <span>Book: {selectedBook.title}</span>
                        <span>Page Number: {curPageNum}&emsp; {pageWords.length} words</span>
                    </Row>
                    <Row style={{ 'fontSize': '1.2em' }}>
                        <Col>
                            <Button variant="outline-primary" style={{width: 100}} type="submit" disabled={curPageNum < 1} 
                                onClick={searchPrevPageWords}> Prev </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-primary" style={{width: 100}} type="submit" 
                                onClick={() => searchOnePageWords(curPageNum)}> Search </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-primary" style={{width: 100}} type="submit" 
                                onClick={searchNextPageWords}> Next </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-primary" style={{width: 100}} type="submit" 
                                onClick={createPageWords}> Create </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-primary" style={{width: 100}} type="submit" disabled={curPageNum < 0} 
                                onClick={() => deletePageWords(curPageNum)}> Delete </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {prevPage.map((item, index) => 
                                <>
                                {(item.wordNum == 0 || item.lineIndex == 0)
                                    ? <br></br> 
                                    : <span></span>
                                }
                                <PageWord word={item} arrIndex={1000+index} clickAction={clickPrevWordHandler}></PageWord>
                                </>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {pageWords.map((item, index) => 
                                <>
                                {(item.wordNum == 0 || item.lineIndex == 0)
                                    ? <br></br> 
                                    : <span></span>
                                }
                                <PageWord word={item} arrIndex={index} clickAction={clickPageWordHandler}></PageWord>
                                </>
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col md={6} className="border p-2">
                    <h5 className="text-center">Dictionary</h5>
                    <Row className="border p-2">
                        <LangDropdownField handler={handleSelectLanguage} langs={langs}/>
                    </Row>
                    <Row className="border p-2">
                        <h5>{String(curPageWord?.pageNum).padStart(3,"0")}&emsp;
                            {String(curPageWord?.lineNum).padStart(3,"0")}&emsp;
                            {String(curPageWord?.wordNum).padStart(3, "0")}&emsp;
                            {curPageWord?.original}&emsp;
                            {countInPage} on page&emsp;
                            {countInBook} on book&emsp;
                        </h5>
                    </Row>
                    <Row className="border p-2">
                        <h5>{curPageWord?.txtContent}</h5>
                    </Row>
                    {isDictFound 
                        ? <><Row className="border p-2">
                                <div>id:         {selectedDictionary?.id}</div>
                                <div>base form:  {selectedDictionary?.baseForm}</div>
                                <div>txtContent: {selectedDictionary?.txtContent}</div>
                                <div>grammar:    {selectedDictionary?.grammar}</div>
                                <div>definition: {selectedDictionary?.definition}</div>
                            </Row>
                            <Row className="border p-2">
                                <Col>
                                    <span>Create Word linked to this Dictionary card: </span>
                                </Col>
                                <Col>
                                    <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={linkDictionaryToWord}> Create </Button>
                                </Col>
                            </Row></>
                        :<><Row>
                                <Form>
                                    <Form.Group className="mb-3" controlId="baseform_dic">
                                        <Form.Label>Base Form</Form.Label>
                                        <Form.Control type="text" 
                                            placeholder="enter base form"
                                            value={selectedDictionary?.baseForm}
                                            onChange={e => setSelectedDictionary({...selectedDictionary, baseForm: e.target.value})}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="grammar_dic">
                                        <Form.Label>Grammar</Form.Label>
                                        <Form.Control as="textarea" rows={5} 
                                            placeholder="Enter grammar"
                                            value={selectedDictionary.grammar}
                                            onChange={e => setSelectedDictionary({...selectedDictionary, grammar: e.target.value})}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="definition_dic">
                                        <Form.Label>Definition</Form.Label>
                                        <Form.Control as="textarea" rows={5} 
                                            placeholder="Enter defenition"
                                            value={selectedDictionary?.definition}
                                            onChange={e => setSelectedDictionary({...selectedDictionary, definition: e.target.value})}/>
                                    </Form.Group>
                                </Form>
                                <div className="text-center p-2">
                                        <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitDictionaryForm}> Save </Button>
                                </div>
                            </Row></>
                    }
                </Col>
            </Row>
        </Container>    
    );
};

export default PageEditorPanel;