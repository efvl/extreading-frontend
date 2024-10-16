import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Dictionary } from '../models/Dictionary';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Language } from '../../langs/models/Language';
import LangService from '../../langs/services/LangService';
import { Col, Container, InputGroup, Row, Table } from 'react-bootstrap';
import LangDropdown from '../../langs/components/LangDropdown';
import DictionaryService from '../services/DictionaryService';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import LangDropdownField from '../../langs/components/LangDropdownField';

interface SearchDictionaryPanelProps {
    txtContent?:string,
    selectAction?:(dictionary:Dictionary) => void,
    cancelAction?:(dictionary:Dictionary) => void;
}

const SearchDictionaryPanel = (props:SearchDictionaryPanelProps) => {

    const navigate = useNavigate();

    const [langs, setLangs] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({});
    const [dictionaryList, setDictionaryList] = useState<Dictionary[]>([]);
    const [filterTxtContent, setFilterTxtContent] = useState<string>("");

    useEffect(() => {
        loadLanguages();
        if(props.txtContent){
            setFilterTxtContent(props.txtContent);
        }
    }, [props]);

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
        const response = await DictionaryService.searchDictionaries( { languageId:selectedLanguage.id, txtContent:filterTxtContent } );
        setDictionaryList(response.data);
    } 

    return (
            <Container className="mt-3">
                <Col className="border p-2">
                    <Row>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-txtContent">TxtContent</InputGroup.Text>
                            <Form.Control type="text"
                                placeholder="Enter txtContent"
                                value={filterTxtContent}
                                onChange={e => setFilterTxtContent(e.target.value)}/>
                        </InputGroup>
                    </Row>
                    <Row>
                        <Col className="col-6">
                            <LangDropdownField handler={handleSelectLanguage} langs={langs}/>
                        </Col>
                        <Col className="col-6">
                            <button onClick={() => searchDictionaries()} className="btn btn-info mx-2" style={{width: 150}}>Search</button>
                        </Col>
                    </Row>
                    <Row>
                        <Table striped bordered hover className="shadow">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">TxtContent</th>
                                <th scope="col">BaseForm</th>
                                <th scope="col">Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dictionaryList.map((item, index) =>
                                    <tr>
                                        <th scope="row">{index + 1}</th> 
                                        <td>{item.txtContent}</td>
                                        <td>{item.baseForm}</td>
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