import { Book } from "../../book/models/Book";
import { Word } from "./Word";

export interface WordListDto {
    wordList?: Word[];
    pageNum?: number;
    book?: Book;
}
