import axios, { AxiosInstance } from 'axios';
import HttpClient from './adapters/HttpClient';

class Axios implements HttpClient {
    private client: AxiosInstance;

    public constructor() {
        this.client = axios.create({
            baseURL: 'https://statusinvest.com.br/',
        });
    }

    public get(url: string): Promise<any> {
        return this.client.get(url);
    }
}

export default new Axios();