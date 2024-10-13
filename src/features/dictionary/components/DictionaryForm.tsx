import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Dictionary } from '../models/Dictionary';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
                <Form.Group className="mb-3" controlId="baseform">
                    <Form.Label>BaseForm</Form.Label>
                    <Form.Control type="text" 
                        placeholder="enter base form"
                        value={formDictionaryValue?.baseForm}
                        onChange={e => setFormDictionaryValue({...formDictionaryValue, baseForm: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="definition">
                    <Form.Label>Definition</Form.Label>
                    <Form.Control type="text" 
                        placeholder="enter definition"
                        value={formDictionaryValue?.definition}
                        onChange={e => setFormDictionaryValue({...formDictionaryValue, definition: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="info">
                    <Form.Label>Info</Form.Label>
                    <Form.Control as="textarea" rows={5} 
                        placeholder="enter info"
                        value={formDictionaryValue?.info}
                        onChange={e => setFormDictionaryValue({...formDictionaryValue, info: e.target.value})}/>
                </Form.Group>

                <div className="text-center p-2">
                    <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitDictionaryFormValue}> Save </Button>
                    <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/dicts">Cancel</Link>
                </div>
            </Form>
    );
};

export default DictionaryForm;
