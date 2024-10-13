import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Language } from "../../langs/models/Language";
import LangDropdown from "../../langs/components/LangDropdown";
import LangService from "../../langs/services/LangService";
import { Word } from "../models/Word";
import WordService from "../services/WordService";
import { useNavigate } from "react-router-dom";
import WordForm from "./WordForm";

const AddWordPanel = () => {

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

    const createNewWord = async (newWord:Word) => {
        const response = await WordService.addWord(newWord);
        navigate('/words');
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4} className="border">
                </Col>
                <Col md={6} className="border p-4 ">
                    <h5 className="text-center">Create Word</h5>
                    <Row>
                        <Col className="col-8">Language: {selectedLanguage?.fullName}</Col>
                        <Col className="col-4">
                            <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                        </Col>
                    </Row>
                    <Row>
                        <WordForm isEdit={false} submitAction={createNewWord}></WordForm>
                    </Row>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>    
    );
};

export default AddWordPanel;
