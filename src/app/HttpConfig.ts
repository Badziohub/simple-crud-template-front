import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Item} from "./main-component/Item";

@Injectable({ providedIn: 'root' })
export class HttpConfig {
  constructor(private http: HttpClient) { }

  postData = {
    content: "This is working",
    status: "TO_DO"
  }

  getCounter(){
    return this.http.get("http://localhost:8080/counter");
  }

  getItems(){
    return this.http.get("http://localhost:8080/");
  }

  addItem(postData : any){
    return this.http.post("http://localhost:8080/",postData);
  }

  updateItem(id : number,postData : any){
    return this.http.put("http://localhost:8080/"+id,postData);
  }

  delete(id : number){
    return this.http.delete("http://localhost:8080/"+id);
  }

}

