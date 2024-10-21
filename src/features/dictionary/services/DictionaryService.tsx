import axios from "axios";
import { Dictionary } from '../models/Dictionary';
import { DictionarySearchRequest } from "../models/DictionarySearchRequest";

export default class DictionaryService {

    static async searchDictionaries(searchData:DictionarySearchRequest) {
        const response = await axios.post("http://localhost:8082/exread/v1/dict/search", searchData);
        // console.log(response.data);
        return response;
    }

    static async searchDictionaryAndStats(searchData:DictionarySearchRequest) {
        const response = await axios.post("http://localhost:8082/exread/v1/dict/search/stats", searchData);
        // console.log(response.data);
        return response;
    }

    static async addDictionary(dictionary:Dictionary) {
        const response = await axios.post("http://localhost:8082/exread/v1/dict", dictionary);
        // console.log(response.data);
        return response;
    }
    static async getDictionaryById(id:string) {
        const response = await axios.get("http://localhost:8082/exread/v1/dict/" + id);
        return response;
    }

    static async editDictionary(dictionary:Dictionary) {
        const response = await axios.put("http://localhost:8082/exread/v1/dict", dictionary);
        return response;
    }

    static async deleteDictionary(id:string) {
        const response = await axios.delete("http://localhost:8082/exread/v1/dict/" + id);
        return response;
    }

}
