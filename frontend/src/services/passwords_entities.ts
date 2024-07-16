import axios from "axios";

export const fetchPasswordEntities = async () => {

    try {
        const response = await axios.get("http://localhost:5053/PasswordEntities");
        return response.data;
    } catch (e) {
        console.error(e);
    }

}