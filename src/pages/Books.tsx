import React, {useEffect, useState} from "react";
import Layout from "../layout/Layout";
import BookService from "../features/book/services/BookService";
import BookActionBar from "../features/book/components/BookActionBar";
import BookTable from "../features/book/components/BookTable";
import { Book } from "../features/book/models/Book";

const Books = () => {

    const [bookList, setBookList] = useState<Book[]>([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    async function fetchBooks() {
        const response = await BookService.searchBooks({});
        console.log(response.data);
        setBookList(response.data);
    }

    const deleteBook = async (id:string) => {
        await BookService.deleteBook(id);
        fetchBooks();
    } 

    return (
        <>
        <Layout>
            <BookActionBar/>
            <BookTable bookList={bookList} remove={deleteBook}/>
        </Layout>
        </>
    );

};

export default Books;
