import axios from "axios";
import { Word } from '../models/Word';
import { WordSearchRequest } from "../models/WordSearchRequest";
import { WordListDto } from "../models/WordListDto";

export default class LangService {

    static async searchWords(searchData:WordSearchRequest) {
        const response = await axios.post("http://localhost:8082/exread/v1/word/search", searchData);
        // console.log(response.data);
        return response;
    }

    static async searchPageWords(searchData:WordSearchRequest) {
        const response = await axios.post("http://localhost:8082/exread/v1/word/search/page", searchData);
        return response;
    }

    static async searchLast5Lines(searchData:WordSearchRequest) {
        const response = await axios.post("http://localhost:8082/exread/v1/word/search/last5lines", searchData);
        return response;
    }

    static async deletePageWords(searchData:WordSearchRequest) {
        const response = await axios.post("http://localhost:8082/exread/v1/word/delete/page", searchData);
        return response;
    }

    static async addWord(word:Word) {
        const response = await axios.post("http://localhost:8082/exread/v1/word", word);
        return response;
    }

    static async addWords(wordList:WordListDto) {
        console.log(wordList)
        const response = await axios.post("http://localhost:8082/exread/v1/word/list", wordList);
        return response;
    }

    static async getWordById(id:string) {
        const response = await axios.get("http://localhost:8082/exread/v1/word/" + id);
        return response;
    }

    static async editWord(word:Word) {
        const response = await axios.put("http://localhost:8082/exread/v1/word", word);
        return response;
    }

    static async deleteWord(id:string) {
        const response = await axios.delete("http://localhost:8082/exread/v1/word/" + id);
        return response;
    }

}
