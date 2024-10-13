import React, { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BookText } from "../models/BookText";

interface PageEditorFormProps {
    bookText?:BookText,
    submitAction?:(bookText:BookText) => void,
}

const PageEditorForm = (props:PageEditorFormProps) => {

    const [bookTextForm, setBookTextForm] = useState<BookText>({});
    // const [allTags, setAllTags] = useState<WTag[]>([]);

    useEffect(() => {
        console.log(props.bookText);
        if(props.bookText){
            setBookTextForm(props.bookText);
        } 
    }, [props]);

    const submitBookText = (e) => {
        e.preventDefault();
        console.log(bookTextForm)
        props.submitAction(bookTextForm);
    }

    // const selectTags = async () => {
    //     const response = await TagService.searchTags({});
    //     console.log(response.data);
    //     setAllTags(response.data);
    // }

    // const tagSelectHandler = (tags:WTag[]) => {
    //     console.log(tags);
    //     setWcardForm({...wcardForm, tags:tags});
    // }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="word">
                <Form.Label>Word</Form.Label>
                <Form.Control type="text" 
                    placeholder="Enter word"
                    value={bookTextForm?.word}
                    onChange={e => setBookTextForm({...bookTextForm, word: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="transcript">
                <Form.Label>Transcription</Form.Label>
                <Form.Control type="text" 
                    placeholder="Enter word transcription"
                    value={bookTextForm?.transcript}
                    onChange={e => setBookTextForm({...bookTextForm, transcript: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="example">
                <Form.Label>Example</Form.Label>
                <Form.Control as="textarea" rows={5} 
                    placeholder="Enter example of word using"
                    value={bookTextForm?.example}
                    onChange={e => setBookTextForm({...bookTextForm, example: e.target.value})}/>
            </Form.Group>

            <div className="text-center p-2">
                <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitBookText}> Save </Button>
                <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/">Cancel</Link>
            </div>
        </Form>
    );
};

export default PageEditorForm;