import React, { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface PageEditorFormProps {
    inputPageText?:string,
    submitAction?:(pageText:string) => void,
}

const PageEditorForm = (props:PageEditorFormProps) => {

    const [pageText, setPageText] = useState<string>("");

    useEffect(() => {
        console.log(props.inputPageText);
        if(props.inputPageText){
            setPageText(props.inputPageText);
        } 
    }, [props]);

    const submitPageText = (e) => {
        e.preventDefault();
        props.submitAction(pageText);
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="example">
                <Form.Label>Page Text</Form.Label>
                <Form.Control as="textarea" rows={10} 
                    placeholder="Enter page text"
                    value={pageText}
                    onChange={e => setPageText(e.target.value)}/>
            </Form.Group>

            <div className="text-center p-2">
                <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitPageText}> Parse </Button>
                {/* <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/">Cancel</Link> */}
            </div>
        </Form>
    );
};

export default PageEditorForm;