import { Button, Col, Container, Form, Row } from "react-bootstrap";
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


const PageEditorPanel = () => {

    const [langs, setLangs] = useState<Language[]>([]);
    const [pageWords, setPageWords] = useState<Word[]>([]);
    const [filterLang, setFilterLang] = useState<Language>({});
    const [filterTxt, setFilterTxt] = useState<string>("");
    const [inputPageText, setInputPageText] = useState<string>("");
    const [selectedBook, setSelectedBook] = useState<Book>({});
    const [selectedDictionary, setSelectedDictionary] = useState<Dictionary>({});
    const [isDictFound, setIsDictFound] = useState<boolean>(false)
    const [curPageNum, setCurPageNum] = useState<number>(0);
    const [curPageWord, setCurPageWord] = useState<Word>({});

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
            line = line.replace(/\u2014/g, ", ");
            
            let lineWords = line.split(whitespaceChars);
            lineWords.forEach((word:string, wIndex: number) => {
                let curWord = { 
                    book: selectedBook,
                    dictionary: selectedDictionary,
                    pageNum: pageNum,
                    lineNum: index,
                    wordNum: wIndex,
                    original: word,
                    txtContent: word.replace(/\,|\.|\!\?/g, "").toLowerCase()
                } as Word
                pageWordsList.push(curWord);
                console.log(" " + wIndex + " " + word)
            })
        })
        setPageWords(pageWordsList);
    }

    const clickPageWordHandler = async (selectedWord:Word) => {
        setCurPageWord(selectedWord);
        const response = await DictionaryService.searchDictionaries( { languageId:filterLang.id, txtContent:selectedWord.txtContent } );
        if(response.data.length > 0) {
            setSelectedDictionary(response.data[0]);
            setIsDictFound(true)
        } else {
            setSelectedDictionary({} as Dictionary);
            setIsDictFound(false)
        }
    }

    const onChangePageNumber = async (pageNumber:number) => {
        setCurPageNum(pageNumber);
    } 

    const submitDictionaryForm = async (e) => {
        e.preventDefault();
        selectedDictionary.language = filterLang;
        selectedDictionary.txtContent = curPageWord.txtContent;
        console.log(selectedDictionary)
        try {
            const response = await DictionaryService.addDictionary(selectedDictionary);
            console.log(response.data)
            setSelectedDictionary(response.data)
        } catch(e) {
            console.log(e.response);
        }
    }

    const handleSelectDictionary = (dictionary:Dictionary) => {
        setSelectedDictionary(dictionary)
    }

    return (
        <Container fluid className="m-3">
            <Row>
                <Col md={6} className="border">
                    <Row>
                        <PageEditorForm onChangePageNumber={onChangePageNumber} submitAction={parsePageText}></PageEditorForm>
                    </Row>
                    <Row>
                        <span>Page Number: {curPageNum}</span>
                    </Row>
                    <Row>
                        <Col md={1}>
                            {pageWords.map((item, index) => 
                                <>
                                {item.wordNum == 0 
                                    ? <><br></br>{String(item.lineNum).padStart(3, "0")}&emsp;</> 
                                    : <span></span>
                                }
                                </>
                            )}
                        </Col>
                        <Col md={10}>
                            {pageWords.map((item, index) => 
                                <>
                                {item.wordNum == 0 
                                    ? <br></br> 
                                    : <span></span>
                                }
                                <PageWord word={item} arrIndex={index} clickAction={clickPageWordHandler}></PageWord>
                                </>
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col md={5} className="border p-2">
                    <h5 className="text-center">Dictionary</h5>
                    <Row className="border p-2">
                        <LangDropdownField handler={handleSelectLanguage} langs={langs}/>
                    </Row>
                    <Row className="border p-2">
                        <h5>{String(curPageWord?.lineNum).padStart(3,"0")}&emsp;
                            {String(curPageWord?.wordNum).padStart(3, "0")}&emsp;
                            {curPageWord?.original}
                        </h5>
                    </Row>
                    <Row className="border p-2">
                        <h5>{curPageWord?.txtContent}</h5>
                    </Row>
                    {isDictFound 
                        ? <><Row className="border p-2">
                                <div>id:         {selectedDictionary?.id}</div>
                                <div>base form:  {selectedDictionary?.baseForm}</div>
                                <div>grammar:    {selectedDictionary?.grammar}</div>
                                <div>definition: {selectedDictionary?.definition}</div>
                            </Row>
                            <Row>
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
                                    <div className="text-center p-2">
                                        <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitDictionaryForm}> Save </Button>
                                    </div>
                                </Form>
                            </Row></>
                        : <Row className="border p-2"><span>NOT FOUND</span></Row>
                        }
                </Col>
            </Row>
        </Container>    
    );
};

export default PageEditorPanel;