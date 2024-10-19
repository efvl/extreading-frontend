
export interface WordSearchRequest {
    ids?: Array<string>;
    shortName?: string;
    fullName?: string;
    txtContent?: string,
    bookId?: string,
    pageNum?: number,
    lineNum?: number,
    wordNum?: number,
}