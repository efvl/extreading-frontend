import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Language } from "../../langs/models/Language";
import LangDropdown from "../../langs/components/LangDropdown";
import LangService from "../../langs/services/LangService";
import { Word } from "../models/Word";
import WordService from "../services/WordService";
import { useNavigate } from "react-router-dom";
import WordForm from "./WordForm";

interface EditWordPanelProps {
    wordId?:string;
}

const EditWordPanel = (props:EditWordPanelProps) => {

    const navigate = useNavigate();

    const [editedWord, setEditedWord] = useState<Word>({});

    useEffect(() => {
        loadEditedWord();
    }, []);

    const loadEditedWord = async () => {
        const result = await WordService.getWordById(props.wordId);
        console.log(result.data);  
        setEditedWord(result.data);
    }

    const updateEditedWord = async (editedWord:Word) => {
        const response = await WordService.editWord(editedWord);
        console.log(response.data);
        navigate('/words');
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={5} className="border">
                </Col>
                <Col md={5} className="border p-4 ">
                    <Row>
                        <WordForm isEdit={true} submitAction={updateEditedWord} word={editedWord}/>
                    </Row>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>   
    );
};

export default EditWordPanel;