import React from "react";
import { Link } from "react-router-dom";
import { Word } from '../models/Word'

interface WordProps {
    word: Word,
    rowNum: number,
    remove: (id: string) => void,
}

const WordTableRow = (props:WordProps) => {

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.word.pageNum}</td>
            <td>{props.word.lineNum}</td>
            <td>{props.word.wordNum}</td>
            <td>{props.word.txtContent}</td>
            <td>
                <button className="btn btn-primary mx-2">View</button>
                <Link to={`/word/edit/${props.word.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.word.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default WordTableRow;
