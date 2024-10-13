import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Book } from '../models/Book';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface BookFormProps {
    book?:Book,
    submitAction?:(book:Book) => void,
    isEdit?:boolean,
    cancelAction?:(book:Book) => void;
}

const BookForm = (props:BookFormProps) => {

    const [formBookValue, setFormBookValue] = useState<Book>({});

    useEffect(() => {
        console.log(props.book);
        if(props.isEdit){
            setFormBookValue(props.book);
        } 
    }, [props]);

    const submitBookFormValue = (e) => {
        e.preventDefault();
        props.submitAction(formBookValue);
    }

    return (
            <Form>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" 
                        placeholder="enter title"
                        value={formBookValue?.title}
                        onChange={e => setFormBookValue({...formBookValue, title: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="authors">
                    <Form.Label>Authors</Form.Label>
                    <Form.Control type="text" 
                        placeholder="enter authors"
                        value={formBookValue?.authors}
                        onChange={e => setFormBookValue({...formBookValue, authors: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="info">
                    <Form.Label>Info</Form.Label>
                    <Form.Control as="textarea" rows={5} 
                        placeholder="enter info"
                        value={formBookValue?.info}
                        onChange={e => setFormBookValue({...formBookValue, info: e.target.value})}/>
                </Form.Group>

                <div className="text-center p-2">
                    <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitBookFormValue}> Save </Button>
                    <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/books">Cancel</Link>
                </div>
            </Form>
    );
};

export default BookForm;
