import axios from "axios";
import { API } from "./api";
import { SwalUtils } from "../utils/swal_utils";

const customAxios = axios.create({
    baseURL: API.endpoint,
});

customAxios.interceptors.response.use(
    response => response,
    error => {
        const data = error.response.data;
        const errorMessage = data?.message ?? error.message ?? "An unexpected error occurred.";
        SwalUtils.showErrorSwalToast(errorMessage);

        return null
    });

export default customAxios;
