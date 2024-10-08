import axios from "axios";

export default class LangService {

    static async searchLanguages(searchData) {
        const response = await axios.post("http://localhost:8082/exread/v1/lang/search", searchData);
        // console.log(response.data);
        return response;
    }

}