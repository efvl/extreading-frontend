import { Book } from "../../book/models/Book";
import { Dictionary } from "../../dictionary/models/Dictionary";

export interface Word {
    id?:string;
    book?: Book;
    pageNum?: number;
    lineNum?: number;
    wordNum?: number;
    original?: string;
    txtContent?: string;
    grammar?: string;
    info?: string;
    dictionary?: Dictionary;
    isSelected?: boolean;
    lineIndex?: number;
}
