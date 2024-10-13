import { Language } from "../../langs/models/Language";

export interface Dictionary {
    id?:string;
    language?: Language;
    baseForm?: string;
    definition?: string;
    example1?: string;
    example2?: string;
    info?: string;
}