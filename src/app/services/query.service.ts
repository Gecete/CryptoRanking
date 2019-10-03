import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

// This service is incharged of the API calls. 

@Injectable()
export class QueryService {

    private limit = "100";
    private apiServer: string = "https://api.coinranking.com/v1/public/coins?limit=".concat(this.limit);

    constructor(private http: HttpClient) { }
    
    //get 100 results starting from value 'offset' (for pagination)
    
    get(value:number): Observable<any> {
        let offset= "&offset="+String(value);
        return this.http.get(this.apiServer.concat(offset));
    }
}