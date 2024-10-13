import { Col, Container, Row } from "react-bootstrap";
import { BookText } from "../models/BookText";
import { useEffect, useState } from "react";
import { Language } from "../../langs/models/Language";
import LangDropdown from "../../langs/components/LangDropdown";
import LangService from "../../langs/services/LangService";
import PageEditorForm from "./PageEditorForm";


const PageEditorPanel = () => {

    const [langs, setLangs] = useState<Language[]>([]);
    const [filterLang, setFilterLang] = useState<Language>({});
    const [selectedText, setSelectedText] = useState<BookText>({});

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

    const createNew = async (bookText:BookText) => {
        // newCard.language = selectedLanguage;
        // newCard.pictureId = pictureId;
        // newCard.audioId = audioId;
        // const response = await WordCardService.createNewWordCard(newCard);
        // navigate('/translate/add', { state: { word1: response.data }});
        let wordCode = "";
        let word = "";
        let start = true;
        let whitespaceChars = /\s/;
        let newLineChars = /\r|\n/g;
        let lastChars = /.+(\.|\?|\!)$/
        let charCode = ""
        let numLine = 1;
        let curLine = "";
        // Array.from(bookText.example).forEach((char: string) => {  
        //     start = true;      
        //     curLine += char;
        //     charCode = `\\u${char.charCodeAt(0).toString(16).padStart(4,"0")}`
        //     char = char.replace(/\u2014/g, " ")
        //     // console.log(charCode)
        //     if(whitespaceChars.test(char)){    
        //         //save word
        //         if(word.length > 0){
                    
        //             console.log(word.replace(/\W$/g, "").replace(/^\W/, ""))
        //             // console.log(wordCode)
        //         }
        //         word = "";
        //         wordCode = "";
        //         start = false;
        //         if(newLineChars.test(char)){
        //             console.log("---> " + numLine + " " + curLine)
        //             curLine = "";
        //         }
        //     }
        //     if(start){
        //         wordCode += charCode
        //         word += char
        //     }
        // });
        // console.log("last word:" + word)
        setSelectedText(bookText);

        let pageLines: String[] = bookText.example.split(newLineChars);
        pageLines.forEach((line:string, index:number) => {
            console.log(" " + index + " " + line);
            line = line.replace(/\u2014/g, ", ");
            
            let lineWords = line.split(whitespaceChars);
            lineWords.forEach((word:string, wIndex: number) => {
                console.log(" " + wIndex + " " + word)
            })
        })

    }

    return (
        <Container fluid className="m-3">
            <Row>
                <Col md={6} className="border">
                    <h5 className="text-center">Edit Words</h5>
                    <PageEditorForm submitAction={createNew}></PageEditorForm>
                    <p>
                        {selectedText.example}
                    </p>
                </Col>
                <Col md={5} className="border p-4 ">
                    <h5 className="text-center">Edit Words</h5>
                    <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                    <h5>{filterLang.shortName}</h5>
                </Col>
                <Col></Col>
            </Row>
        </Container>    
    );
};

export default PageEditorPanel;