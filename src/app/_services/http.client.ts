import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';

@Injectable()
export class HttpClient {

    private http;
    private urlPrefix;

    constructor(http: Http) {
        this.http = http;
        this.urlPrefix = 'http://localhost:11223';
    }

    get(url, headers) {
        return this.http.get(this.urlPrefix + url, headers);
    }

    post(url, data, headers) {
        return this.http.post(this.urlPrefix + url, data, headers);
    }

    put(url, data, headers) {
        return this.http.put(this.urlPrefix + url, data, headers);
    }

}