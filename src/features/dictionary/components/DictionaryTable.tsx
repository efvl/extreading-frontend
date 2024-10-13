import React from "react";
import DictionaryTableRow from "./DictTableRow";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {Dictionary} from '../models/Dictionary';

interface DictionaryTableProps {
    dictList: Array<Dictionary>,
    remove: (id: string) => void,
}

const DictionaryTable = (props:DictionaryTableProps) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">BaseForm</th>
                    <th scope="col">Definition</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.dictList.map((item, index) =>
                        <DictionaryTableRow key={item.id} rowNum={index + 1} dictionary={item} remove={props.remove} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default DictionaryTable;
