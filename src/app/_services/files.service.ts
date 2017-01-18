import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class FilesService {
  constructor(private http: Http) {}

  getUrlDocument(userId, documentName) {
    return 'http://localhost:3000/api/user/' + userId + '/files/' + documentName;
  }

}
