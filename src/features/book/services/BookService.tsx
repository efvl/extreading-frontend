import axios from "axios";
import { Book } from '../models/Book';
import { BookSearchRequest } from "../models/BookSearchRequest";

export default class BookService {

    static async searchBooks(searchData:BookSearchRequest) {
        const response = await axios.post("http://localhost:8082/exread/v1/book/search", searchData);
        // console.log(response.data);
        return response;
    }

    static async addBook(book:Book) {
        const response = await axios.post("http://localhost:8082/exread/v1/book", book);
        // console.log(response.data);
        return response;
    }
    static async getBookById(id:string) {
        const response = await axios.get("http://localhost:8082/exread/v1/book/" + id);
        return response;
    }

    static async editBook(book:Book) {
        const response = await axios.put("http://localhost:8082/exread/v1/book", book);
        return response;
    }

    static async deleteBook(id:string) {
        const response = await axios.delete("http://localhost:8082/exread/v1/book/" + id);
        return response;
    }

}