import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Language } from "../../langs/models/Language";
import LangDropdown from "../../langs/components/LangDropdown";
import LangService from "../../langs/services/LangService";
import { Book } from "../models/Book";
import BookService from "../services/BookService";
import { useNavigate } from "react-router-dom";
import BookForm from "./BookForm";

interface EditBookPanelProps {
    bookId?:string;
}

const EditBookPanel = (props:EditBookPanelProps) => {

    const navigate = useNavigate();

    const [editedBook, setEditedBook] = useState<Book>({});
    const [langs, setLangs] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({});

    useEffect(() => {
        loadLanguages();
        loadEditedBook();
    }, []);

    const loadLanguages = async () => {
        const response = await LangService.searchLanguages({});
        if(response.data?.length > 0){
            setLangs(response.data);
            setSelectedLanguage(response.data[0]); 
        }
    }

    const loadEditedBook = async () => {
        const result = await BookService.getBookById(props.bookId);
        console.log(result.data);  
        setEditedBook(result.data);
        if(result.data) {
            setSelectedLanguage(result.data.language);
        }
    }

    const handleSelectLanguage = (e) => {
        console.log(e);
        setSelectedLanguage(langs.find(item => item.id == e));
    }

    const updateEditedBook = async (editedBook:Book) => {
        editedBook.language = selectedLanguage;
        const response = await BookService.editBook(editedBook);
        console.log(response.data);
        navigate('/books');
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4} className="border">
                </Col>
                <Col md={6} className="border p-4 ">
                    <Row>
                        <Col className="col-8">Language: {selectedLanguage.fullName}</Col>
                        <Col className="col-4">
                            <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                        </Col>
                    </Row>
                    <Row>
                        <BookForm isEdit={true} submitAction={updateEditedBook} book={editedBook}/>
                    </Row>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>   
    );
};

export default EditBookPanel;
