import React from "react";
import { Link } from "react-router-dom";
import { Book } from '../models/Book'

interface BookProps {
    book: Book,
    rowNum: number,
    remove: (id: string) => void,
}

const BookTableRow = (props:BookProps) => {

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.book.id}</td>
            <td>{props.book.title}</td>
            <td>{props.book.authors}</td>
            <td>
                <button className="btn btn-primary mx-2">View</button>
                <Link to={`/book/edit/${props.book.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.book.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default BookTableRow;
