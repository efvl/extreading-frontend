import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Word } from '../models/Word';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface WordFormProps {
    word?:Word,
    submitAction?:(word:Word) => void,
    isEdit?:boolean,
    cancelAction?:(word:Word) => void;
}

const WordForm = (props:WordFormProps) => {

    const [formWordValue, setFormWordValue] = useState<Word>({});

    useEffect(() => {
        console.log(props.word);
        if(props.isEdit){
            setFormWordValue(props.word);
        } 
    }, [props]);

    const submitWordFormValue = (e) => {
        e.preventDefault();
        props.submitAction(formWordValue);
    }

    return (
            <Form>
                <Form.Group className="mb-3" controlId="txtcontent">
                    <Form.Label>TxtContent</Form.Label>
                    <Form.Control type="text" 
                        placeholder="enter txtContent"
                        value={formWordValue?.txtContent}
                        onChange={e => setFormWordValue({...formWordValue, txtContent: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="grammar">
                    <Form.Label>Grammar</Form.Label>
                    <Form.Control type="text" 
                        placeholder="enter grammar"
                        value={formWordValue?.grammar}
                        onChange={e => setFormWordValue({...formWordValue, grammar: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="info">
                    <Form.Label>Info</Form.Label>
                    <Form.Control as="textarea" rows={5} 
                        placeholder="enter info"
                        value={formWordValue?.info}
                        onChange={e => setFormWordValue({...formWordValue, info: e.target.value})}/>
                </Form.Group>

                <div className="text-center p-2">
                    <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitWordFormValue}> Save </Button>
                    <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/words">Cancel</Link>
                </div>
            </Form>
    );
};

export default WordForm;