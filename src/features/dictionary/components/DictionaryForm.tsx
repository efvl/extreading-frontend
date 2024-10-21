import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Dictionary } from '../models/Dictionary';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isEditable } from '@testing-library/user-event/dist/utils';
import { Row } from 'react-bootstrap';

interface DictionaryFormProps {
    dictionary?:Dictionary,
    submitAction?:(dictionary:Dictionary) => void,
    isEdit?:boolean,
    cancelAction?:(dictionary:Dictionary) => void;
}

const DictionaryForm = (props:DictionaryFormProps) => {

    const [formDictionaryValue, setFormDictionaryValue] = useState<Dictionary>({});

    useEffect(() => {
        console.log(props.dictionary);
        if(props.isEdit){
            setFormDictionaryValue(props.dictionary);
        } 
    }, [props]);

    const submitDictionaryFormValue = (e) => {
        e.preventDefault();
        props.submitAction(formDictionaryValue);
    }

    return (
            <Form>
                {props.isEdit
                    ? <>
                        <Row  className="border p-2">
                            <h5>{formDictionaryValue.txtContent}</h5>
                        </Row>
                    </>
                    : <>
                        <Form.Group className="mb-3" controlId="txtContent">
                        <Form.Label>txtContent</Form.Label>
                        <Form.Control type="text"
                            placeholder="enter txtContent"
                            value={formDictionaryValue?.txtContent}
                            onChange={e => setFormDictionaryValue({...formDictionaryValue, txtContent: e.target.value})}/>
                        </Form.Group>
                    </>
                }
                <Form.Group className="mb-3" controlId="baseform">
                    <Form.Label>BaseForm</Form.Label>
                    <Form.Control type="text" 
                        placeholder="enter base form"
                        value={formDictionaryValue?.baseForm}
                        onChange={e => setFormDictionaryValue({...formDictionaryValue, baseForm: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="definition">
                    <Form.Label>Definition</Form.Label>
                    <Form.Control as="textarea" rows={5} 
                        placeholder="enter definition"
                        value={formDictionaryValue?.definition}
                        onChange={e => setFormDictionaryValue({...formDictionaryValue, definition: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="grammar">
                    <Form.Label>Grammar</Form.Label>
                    <Form.Control as="textarea" rows={5} 
                        placeholder="enter grammar"
                        value={formDictionaryValue?.grammar}
                        onChange={e => setFormDictionaryValue({...formDictionaryValue, grammar: e.target.value})}/>
                </Form.Group>
                <div className="text-center p-2">
                    <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitDictionaryFormValue}> Save </Button>
                    <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/dicts">Cancel</Link>
                </div>
            </Form>
    );
};

export default DictionaryForm;
