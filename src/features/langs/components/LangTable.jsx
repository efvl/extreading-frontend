import React from "react";
import LangTableRow from "../components/LangTableRow";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const LangTable = ({langs, remove}) => {

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
                    {langs.map((item, index) =>
                        <LangTableRow key={item.id} rowNum={index + 1} lang={item} remove={remove} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default LangTable;