import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

// This service is incharged of the API calls. 

@Injectable()
export class QueryService {

    private limit = "100";
    private apiServer: string = "https://api.coinranking.com/v2/coins?limit=".concat(this.limit);
    private auth_token = 'coinranking4e5008f4513eeb3d3be9280a6bf6c83d4398fa39dff15344';
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_token}`,
        'Access-Control-Allow-Origin': '*'
      })   

    constructor(private http: HttpClient) {
    }
    
    //get 100 results starting from value 'offset' (for pagination)
    
    get(value:number): Observable<any> {
        let offset= "&offset="+String(value);
        return this.http.get(this.apiServer.concat(offset),{ headers: this.headers } );
    }
}