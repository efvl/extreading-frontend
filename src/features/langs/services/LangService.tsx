import axios from "axios";
import {LangSearchRequest} from '../models/LangSearchRequest'
import {Language} from '../models/Language';

export default class LangService {

    static async searchLanguages(searchData:LangSearchRequest) {
        const response = await axios.post("http://localhost:8082/exread/v1/lang/search", searchData);
        // console.log(response.data);
        return response;
    }

    static async addLanguage(language:Language) {
        const response = await axios.post("http://localhost:8082/exread/v1/lang", language);
        // console.log(response.data);
        return response;
    }
    static async getLanguageById(id:string) {
        const response = await axios.get("http://localhost:8082/exread/v1/lang/" + id);
        return response;
    }

    static async editLanguage(language:Language) {
        const response = await axios.put("http://localhost:8082/exread/v1/lang", language);
        return response;
    }

    static async deleteLanguage(id:string) {
        const response = await axios.delete("http://localhost:8082/exread/v1/lang/" + id);
        return response;
    }

}