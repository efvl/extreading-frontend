import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Dictionary } from '../models/Dictionary';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Language } from '../../langs/models/Language';
import LangService from '../../langs/services/LangService';
import { Col, Container, Row, Table } from 'react-bootstrap';
import LangDropdown from '../../langs/components/LangDropdown';
import DictionaryService from '../services/DictionaryService';

interface SearchDictionaryPanelProps {
    dictionary?:Dictionary,
    selectAction?:(dictionary:Dictionary) => void,
    cancelAction?:(dictionary:Dictionary) => void;
}

const SearchDictionaryPanel = (props:SearchDictionaryPanelProps) => {

    const navigate = useNavigate();

    const [langs, setLangs] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({});
    const [dictionaryList, setDictionaryList] = useState<Dictionary[]>([]);

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

    const searchDictionaries = async () => {
        const response = await DictionaryService.searchDictionaries( { languageId:selectedLanguage.id } );
        setDictionaryList(response.data);
    } 

    return (
            <Container className="mt-3">
                <Col className="border p-4 ">
                    <h5 className="text-center">Create Dictionary</h5>
                    <Row>
                        <Col className="col-8">Language: {selectedLanguage?.fullName}</Col>
                        <Col className="col-4">
                            <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                        </Col>
                    </Row>
                    <Row>
                        <button onClick={() => searchDictionaries()} className="btn btn-info mx-2" style={{width: 150}}>Search</button>
                    </Row>
                    <Row>
                        <Table striped bordered hover className="shadow">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">BaseForm</th>
                                <th scope="col">Definition</th>
                                <th scope="col">Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dictionaryList.map((item, index) =>
                                    <tr>
                                        <th scope="row">{index + 1}</th> 
                                        <td>{item.baseForm}</td>
                                        <td>{item.definition}</td>
                                        <td>
                                            <button onClick={() => props.selectAction(item)} className="btn btn-primary mx-2">Select</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
            </Container>  
    );
};

export default SearchDictionaryPanel;