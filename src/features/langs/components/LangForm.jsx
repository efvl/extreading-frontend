import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LangService from '../services/LangService'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LangForm = (props) => {

    const [lang, setLang] = useState({
        id:"",
        shortName:"",
        fullName:""
    });

    const submitLanguage = (e) => {
        e.preventDefault();
        props.submitAction(lang);
    }

    useEffect(() => {
        if(props.isEdit){
            loadLanguage();
        }
    }, []);

    const loadLanguage = async () => {
        const result = await LangService.getLanguageById(props.languageId);
        console.log(result.data);  
        setLang(result.data);
    }

    return (
        <Container>
            <Row>
                <Col className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h5 className="text-center m-4">{props.isEdit?'Edit':'Create'} Language</h5>
                    <Form>
                        <Form.Group className="mb-3" controlId="shortName">
                            <Form.Label>Short Name</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Enter short language name"
                                value={lang.shortName}
                                onChange={e => setLang({...lang, shortName: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Enter full language name"
                                value={lang.fullName}
                                onChange={e => setLang({...lang, fullName: e.target.value})}/>
                        </Form.Group>
                        <Button variant="outline-primary" type="submit" onClick={submitLanguage}>{props.isEdit?' Save ':' Add '} </Button>
                        <Link className="btn btn-outline-danger mx-2" to="/lang">Cancel</Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LangForm;