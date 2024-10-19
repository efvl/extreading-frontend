import React from "react";
import WordTableRow from "./WordTableRow";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {Word} from '../models/Word';

interface WordTableProps {
    wordList: Array<Word>,
    remove: (id: string) => void,
}

const WordTable = (props:WordTableProps) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">page</th>
                    <th scope="col">line</th>
                    <th scope="col">num</th>
                    <th scope="col">TxtContent</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.wordList.map((item, index) =>
                        <WordTableRow key={item.id} rowNum={index + 1} word={item} remove={props.remove} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default WordTable;
