import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Language } from "../../langs/models/Language";
import LangDropdown from "../../langs/components/LangDropdown";
import LangService from "../../langs/services/LangService";
import { Dictionary } from "../models/Dictionary";
import DictionaryService from "../services/DictionaryService";
import { useNavigate } from "react-router-dom";
import DictionaryForm from "./DictionaryForm";

interface EditDictionaryPanelProps {
    dictionaryId?:string;
}

const EditDictionaryPanel = (props:EditDictionaryPanelProps) => {

    const navigate = useNavigate();

    const [editedDictionary, setEditedDictionary] = useState<Dictionary>({});
    const [langs, setLangs] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({});

    useEffect(() => {
        loadLanguages();
        loadEditedDictionary();
    }, []);

    const loadLanguages = async () => {
        const response = await LangService.searchLanguages({});
        if(response.data?.length > 0){
            setLangs(response.data);
            setSelectedLanguage(response.data[0]); 
        }
    }

    const loadEditedDictionary = async () => {
        const result = await DictionaryService.getDictionaryById(props.dictionaryId);
        console.log(result.data);  
        setEditedDictionary(result.data);
        if(result.data) {
            setSelectedLanguage(result.data.language);
        }
    }

    const handleSelectLanguage = (e) => {
        console.log(e);
        setSelectedLanguage(langs.find(item => item.id == e));
    }

    const updateEditedDictionary = async (editedDictionary:Dictionary) => {
        editedDictionary.language = selectedLanguage;
        const response = await DictionaryService.editDictionary(editedDictionary);
        console.log(response.data);
        navigate('/dicts');
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
                        <DictionaryForm isEdit={true} submitAction={updateEditedDictionary} dictionary={editedDictionary}/>
                    </Row>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>   
    );
};

export default EditDictionaryPanel;
