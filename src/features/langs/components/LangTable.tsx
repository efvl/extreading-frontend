import React from "react";
import LangTableRow from "./LangTableRow";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {Language} from '../models/Language';

interface LangTableProps {
    langs: Array<Language>,
    remove: (id: string) => void,
}

const LangTable = (props:LangTableProps) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">ShortName</th>
                    <th scope="col">FullName</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.langs.map((item, index) =>
                        <LangTableRow key={item.id} rowNum={index + 1} lang={item} remove={props.remove} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default LangTable;
