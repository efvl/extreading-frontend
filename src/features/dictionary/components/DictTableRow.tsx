import React from "react";
import { Link } from "react-router-dom";
import { Dictionary } from '../models/Dictionary'

interface DictionaryProps {
    dictionary: Dictionary,
    rowNum: number,
    remove: (id: string) => void,
}

const DictionaryTableRow = (props:DictionaryProps) => {

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.dictionary.id}</td>
            <td>{props.dictionary.baseForm}</td>
            <td>{props.dictionary.definition}</td>
            <td>
                <button className="btn btn-primary mx-2">View</button>
                <Link to={`/dict/edit/${props.dictionary.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.dictionary.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default DictionaryTableRow;
