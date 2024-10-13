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
    const [langs, setLangs] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({});

    useEffect(() => {
        loadLanguages();
        loadEditedWord();
    }, []);

    const loadLanguages = async () => {
        const response = await LangService.searchLanguages({});
        if(response.data?.length > 0){
            setLangs(response.data);
            setSelectedLanguage(response.data[0]); 
        }
    }

    const loadEditedWord = async () => {
        const result = await WordService.getWordById(props.wordId);
        console.log(result.data);  
        setEditedWord(result.data);
        if(result.data) {
            setSelectedLanguage(result.data.language);
        }
    }

    const handleSelectLanguage = (e) => {
        console.log(e);
        setSelectedLanguage(langs.find(item => item.id == e));
    }

    const updateEditedWord = async (editedWord:Word) => {
        const response = await WordService.editWord(editedWord);
        console.log(response.data);
        navigate('/words');
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