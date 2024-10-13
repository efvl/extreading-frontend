import { Language } from "../../langs/models/Language";

export interface BookText {
    id?:string;
    word?:string;
    transcript?:string;
    example?:string;
    dateCreated?:Date;
    language?:Language;
}