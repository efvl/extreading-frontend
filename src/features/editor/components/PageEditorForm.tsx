import React, { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface PageEditorFormProps {
    inputPageText?:string,
    curPageNum?:number,
    submitAction?:(pageText:string, pageNum:number) => void,
    onChangePageNumber?:(pageNum:number) => void,
}

const PageEditorForm = (props:PageEditorFormProps) => {

    const [inputPageText, setInputPageText] = useState<string>("");
    const [curPageNum, setCurPageNum] = useState<number>(0);

    useEffect(() => {
        if(props.inputPageText){
            setInputPageText(props.inputPageText);
        }
        if(props.curPageNum){
            setCurPageNum(props.curPageNum);
        }
    }, [props]);

    const submitPageText = (e) => {
        e.preventDefault();
        props.submitAction(inputPageText, curPageNum);
    }

    const updatePageNum = (numPage:number) => {
        setCurPageNum(numPage)
        props.onChangePageNumber(numPage);
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="pageNum">
                <Form.Label>Page Number</Form.Label>
                <Form.Control type="text"
                    placeholder="Enter page number"
                    value={curPageNum}
                    onChange={e => updatePageNum(Number(e.target.value))}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="inputPageText">
                <Form.Label>Page Text</Form.Label>
                <Form.Control as="textarea" rows={10} 
                    placeholder="Enter page text"
                    value={inputPageText}
                    onChange={e => setInputPageText(e.target.value)}/>
            </Form.Group>

            <div className="text-center p-2">
                <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitPageText}> Parse </Button>
                {/* <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/">Cancel</Link> */}
            </div>
        </Form>
    );
};

export default PageEditorForm;