import React from "react";
import { Link } from "react-router-dom";
import {Language} from '../models/Language'

interface LanguageProps {
    lang: Language,
    rowNum: number,
    remove: (id: string) => void,
}

const LangTableRow = (props:LanguageProps) => {

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.lang.id}</td>
            <td>{props.lang.shortName}</td>
            <td>{props.lang.fullName}</td>
            <td>
                <button className="btn btn-primary mx-2">View</button>
                <Link to={`/lang/edit/${props.lang.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.lang.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default LangTableRow;