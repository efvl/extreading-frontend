import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Language } from "../../langs/models/Language";
import LangDropdown from "../../langs/components/LangDropdown";
import LangService from "../../langs/services/LangService";
import { Book } from "../models/Book";
import BookService from "../services/BookService";
import { useNavigate } from "react-router-dom";
import BookForm from "./BookForm";

const AddBookPanel = () => {

    const navigate = useNavigate();

    const [langs, setLangs] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({});

    useEffect(() => {
        loadLanguages();
    }, []);

    const loadLanguages = async () => {
        const response = await LangService.searchLanguages({});
        if(response.data?.length > 0){
            setLangs(response.data); 
            setSelectedLanguage(response.data[0]); 
        }
    }

    const handleSelectLanguage = (e:string) => {
        setSelectedLanguage(langs.find(item => item.id == e));
    }

    const createNewBook = async (newBook:Book) => {
        newBook.language = selectedLanguage;
        const response = await BookService.addBook(newBook);
        navigate('/books');
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4} className="border">
                </Col>
                <Col md={6} className="border p-4 ">
                    <h5 className="text-center">Create Book</h5>
                    <Row>
                        <Col className="col-8">Language: {selectedLanguage?.fullName}</Col>
                        <Col className="col-4">
                            <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                        </Col>
                    </Row>
                    <Row>
                        <BookForm isEdit={false} submitAction={createNewBook}></BookForm>
                    </Row>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>    
    );
};

export default AddBookPanel;
