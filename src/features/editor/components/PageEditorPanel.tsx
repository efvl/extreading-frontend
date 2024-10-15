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


const PageEditorPanel = () => {

    const [langs, setLangs] = useState<Language[]>([]);
    const [pageWords, setPageWords] = useState<Word[]>([]);
    const [filterLang, setFilterLang] = useState<Language>({});
    const [inputPageText, setInputPageText] = useState<string>("");
    const [selectedBook, setSelectedBook] = useState<Book>({});
    const [selectedDictionary, setSelectedDictionary] = useState<Dictionary>({});
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

    const parsePageText = async (pageText:string) => {
        let whitespaceChars = /\s/;
        let newLineChars = /\r|\n/g;
        let lastChars = /.+(\.|\?|\!)$/

        setInputPageText(pageText);

        let pageLines: String[] = pageText.split(newLineChars);
        pageLines.forEach((line:string, index:number) => {

            console.log(" " + index + " " + line);
            line = line.replace(/\u2014/g, ", ");
            
            let lineWords = line.split(whitespaceChars);
            lineWords.forEach((word:string, wIndex: number) => {
                let curWord = { 
                    book: selectedBook,
                    dictionary: selectedDictionary,
                    pageNum: curPageNum,
                    lineNum: index,
                    wordNum: wIndex,
                    original: word,
                    txtContent: word.replace(/\,|\.|\!\?/g, "").toLowerCase()
                } as Word
                pageWords.push(curWord);
                console.log(" " + wIndex + " " + word)
            })
        })
    }

    const clickPageWordHandler = async (selectedWord:Word) => {
        setCurPageWord(selectedWord);
        console.log("clicked on: " + selectedWord.original)
    }

    const submitWordFormValue = async (e) => {
        e.preventDefault();
    }

    return (
        <Container fluid className="m-3">
            <Row>
                <Col md={6} className="border">
                    <Row>
                        <PageEditorForm submitAction={parsePageText}></PageEditorForm>
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
                <Col md={5} className="border p-4">
                    <h5 className="text-center">Dictionary</h5>
                    <Row className="border p-2">
                        <Col><LangDropdown handler={handleSelectLanguage} langs={langs}/></Col>
                        <Col><h5> {filterLang.shortName}</h5></Col>
                    </Row>
                    <Row className="border p-2">
                        <h5>{String(curPageWord?.wordNum).padStart(3, "0")}&emsp;{curPageWord?.original}</h5>
                    </Row>
                    <Row className="border p-2">
                        <h5>{curPageWord?.txtContent}</h5>
                    </Row>
                    <Row>
                        <Form>
                            <Form.Group className="mb-3" controlId="baseform">
                                <Form.Label>BaseForm</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="enter base form"
                                    value={selectedDictionary?.baseForm}
                                    onChange={e => setSelectedDictionary({...selectedDictionary, baseForm: e.target.value})}/>
                            </Form.Group>
                            <div className="text-center p-2">
                                <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitWordFormValue}> Save </Button>
                            </div>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>    
    );
};

export default PageEditorPanel;