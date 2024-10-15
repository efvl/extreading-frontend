import { UUID } from "crypto";

export interface DictionarySearchRequest {
    ids?: Array<string>;
    languageId?: string;
    fullName?: string;
}
