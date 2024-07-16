import axios from "axios";
import {CreatePasswordEntityRequest} from "../types/PasswordEntityDto.ts";

export const fetchPasswordEntities = async () => {
    try {
        const response = await axios.get("http://localhost:5053/PasswordEntities");
        return response.data;
    } catch (e) {
        console.error(e);
    }

}

export const createPasswordEntity = async (data: CreatePasswordEntityRequest) => {
    try {
        const response = await axios.post("http://localhost:5053/PasswordEntities", data);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};