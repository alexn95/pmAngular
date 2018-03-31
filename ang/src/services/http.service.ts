import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

    constructor(
        private http: Http,
    ) { }

    public post(path: string, params): Observable<any> {
        return this.http
            .post(path, params)
            .map((respons) => respons.json());
    }
}

