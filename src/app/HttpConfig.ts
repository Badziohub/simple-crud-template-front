import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  addItem(){
    console.log(JSON.stringify(this.postData));
    return this.http.post("http://localhost:8080/",this.postData);
  }

  delete(id : number){
    return this.http.delete("http://localhost:8080/"+id);
  }

}

