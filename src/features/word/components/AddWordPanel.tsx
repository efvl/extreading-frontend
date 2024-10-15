import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Language } from "../../langs/models/Language";
import { Word } from "../models/Word";
import WordService from "../services/WordService";
import { useNavigate } from "react-router-dom";
import WordForm from "./WordForm";
import SearchBookPanel from "../../book/components/SearchBookPanel";
import { Book } from "../../book/models/Book";
import SearchDictionaryPanel from "../../dictionary/components/SearchDictionaryPanel";
import { Dictionary } from "../../dictionary/models/Dictionary";

const AddWordPanel = () => {

    const navigate = useNavigate();

    const [langs, setLangs] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({});
    const [selectedBook, setSelectedBook] = useState<Book>({})
    const [selectedDictionary, setSelectedDictionary] = useState<Dictionary>({})


    const handleSelectBook = (book:Book) => {
        setSelectedBook(book)
    }

    const handleSelectDictionary = (dictionary:Dictionary) => {
        setSelectedDictionary(dictionary)
    }

    const createNewWord = async (newWord:Word) => {
        newWord.book = selectedBook;
        newWord.dictionary = selectedDictionary;
        if(newWord && selectedBook && selectedDictionary){
            const response = await WordService.addWord(newWord);
            navigate('/words');
        } else {
            console.log('select requred fileds')
        }

    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={5} className="border">
                    <Row>
                        <SearchBookPanel selectAction={handleSelectBook}></SearchBookPanel>
                    </Row>
                    <Row>
                        <SearchDictionaryPanel selectAction={handleSelectDictionary}></SearchDictionaryPanel>
                    </Row>
                </Col>
                <Col md={5} className="border p-4 ">
                    <h5 className="text-center">Create Word</h5>
                    <Row>
                        <h5>Book title: {selectedBook?.title}</h5>
                    </Row>
                    <Row>
                        <h5>Dictionary form: {selectedDictionary?.baseForm}</h5>
                    </Row>
                    <Row>
                        <WordForm isEdit={false} submitAction={createNewWord}></WordForm>
                    </Row>
                </Col>
            </Row>
        </Container>    
    );
};

export default AddWordPanel;
