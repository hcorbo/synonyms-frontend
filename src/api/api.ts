const IS_PROD = process.env.NODE_ENV === "production";

export class API {
    public static endpoint = IS_PROD ? process.env.REACT_APP_ENDPOINT : "http://localhost:5000";
}

