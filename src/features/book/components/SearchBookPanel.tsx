import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Book } from '../models/Book';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Language } from '../../langs/models/Language';
import LangService from '../../langs/services/LangService';
import { Col, Container, Row, Table } from 'react-bootstrap';
import LangDropdown from '../../langs/components/LangDropdown';
import BookService from '../services/BookService';

interface SearchBookPanelProps {
    book?:Book,
    selectAction?:(book:Book) => void,
    cancelAction?:(book:Book) => void;
}

const SearchBookPanel = (props:SearchBookPanelProps) => {

    const navigate = useNavigate();

    const [langs, setLangs] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({});
    const [bookList, setBookList] = useState<Book[]>([]);

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

    const searchBooks = async () => {
        const response = await BookService.searchBooks({});
        console.log(response.data);
        setBookList(response.data);
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
                            <button onClick={() => searchBooks()} className="btn btn-danger mx-2">Delete</button>
                        </Row>
                        <Row>
                            <Table striped bordered hover className="shadow">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Authors</th>
                                    <th scope="col">Select</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookList.map((item, index) =>
                                        <tr>
                                            <th scope="row">{index + 1}</th> 
                                            <td>{item.title}</td>
                                            <td>{item.authors}</td>
                                            <td>
                                                <button onClick={() => props.selectAction(item)} className="btn btn-danger mx-2">Select</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>  
    );
};

export default SearchBookPanel;