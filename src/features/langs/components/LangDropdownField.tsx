import Dropdown from 'react-bootstrap/Dropdown';
import { Language } from "../models/Language";
import { DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

interface LangDropdownFieldProps {
    langs: Array<Language>,
    handler: (id:String) => void,
}

const LangDropdownField = (props:LangDropdownFieldProps) => {

    const [fullName, setFullName] = useState<string>("");

    const clickPageWordHandler = async (langId:string) => {
        setFullName(props.langs.find(item => item.id == langId).fullName);
        props.handler(langId);
    }

    return (
            <InputGroup className="mb-3">
                <DropdownButton onSelect={(e: string) => clickPageWordHandler(e)} variant="outline-secondary" title="Language" id="input-group-dropdown-1">
                    {props.langs.map((item:Language, i:number) =>
                        <Dropdown.Item eventKey={item.id} key={i}>{item.fullName}</Dropdown.Item>
                    )}
                </DropdownButton>
                <Form.Control type="text" 
                                placeholder="Enter full language name"
                                value={fullName}
                                contentEditable={false}/>
            </InputGroup>  
    );
};

export default LangDropdownField;