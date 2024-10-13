import React from "react";
import BookTableRow from "./BookTableRow";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {Book} from '../models/Book';

interface BookTableProps {
    bookList: Array<Book>,
    remove: (id: string) => void,
}

const BookTable = (props:BookTableProps) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Authors</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.bookList.map((item, index) =>
                        <BookTableRow key={item.id} rowNum={index + 1} book={item} remove={props.remove} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default BookTable;
