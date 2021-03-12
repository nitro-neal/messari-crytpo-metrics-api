import axios, { AxiosResponse } from "axios";

enum HttpStatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

const errorStatusCodes = [
  // 4xx Client errors
  HttpStatusCode.UNAUTHORIZED,
  HttpStatusCode.FORBIDDEN,
  HttpStatusCode.UNPROCESSABLE_ENTITY,
  HttpStatusCode.NOT_FOUND,
  // 5xx Server errors
  HttpStatusCode.INTERNAL_SERVER_ERROR,
];

class APIService {
  static handleErrorStatusCodes(response: AxiosResponse) {
    if (errorStatusCodes.includes(response.status)) {
      throw new Error(`Error with response status ${response.status}`);
    }

    if (!response || !response.data) {
      throw new Error(`Error with response ${response}`);
    }
  }

  static async get(endpoint: string) {
    const input: RequestInfo = endpoint;

    const response = await axios.get(input);
    this.handleErrorStatusCodes(response);
    return response.data;
  }
}

export default APIService;
