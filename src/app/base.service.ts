import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, asapScheduler, pipe, of, from, throwError, interval, merge, fromEvent } from 'rxjs';
import { map,catchError} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router/src/router_state';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

   constructor(private http: HttpClient) {
       
    }

	jwt() {
			const httpOptions = {
	            headers : new HttpHeaders({
				  'Content-Type': 'application/json',
				   "Access-Control-Allow-Origin": "*",
				    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
				    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
				})
      		};
      		return httpOptions;
		
	}
	fetchCategories (){
		return this.http.get('/api/channels',this.jwt())
	    .pipe(map((response : Response) => {
	        return response;   
	    }), catchError((error: any) =>{
	        return error;    
	    }));
	}
	getIpaddress(){
		return this.http.get('https://jsonip.com')
	    .pipe(map((response : Response) => {
	        return response;   
	    }), catchError((error: any) =>{
	        return error;    
	    }));
	}
	streamingData (channel: number, userip: string){
		return this.http.get('/api/streaming?channel='+ channel+ '&userip='+ userip,this.jwt())
	    .pipe(map((response : Response) => {
	         return response; 
	    }), catchError((error: any) =>{
	        return error;      
	    }));
	}

}
