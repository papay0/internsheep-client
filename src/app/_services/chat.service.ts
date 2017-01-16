import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ChatService {
    constructor(private http: Http) {}

    getMessages(student: string, company: string, offer: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get(`/api/applications/${student}/${company}/${offer}/chat`, { headers })
            .map(res => res.json())
            .map((res) => res.application );
    }

    newMessage(student: string, company: string, offer: string, message) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .post(`/api/applications/${student}/${company}/${offer}/chat/new`, { headers })
            .map(res => res.json())
            .map((res) => res.application );
    }

}