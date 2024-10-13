import { Language } from "../../langs/models/Language"

export interface Book {
    id?:string;
    language?: Language;
    title?: string;
    authors?: string;
    year?: number;
    info?: string;
}