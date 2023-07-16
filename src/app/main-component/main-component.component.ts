import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpConfig} from "../HttpConfig";
import {MatListModule} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {ɵEmptyOutletComponent} from "@angular/router";
import {Item} from "./Item";
import {MatTableModule} from "@angular/material/table";



@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, NgForOf, ɵEmptyOutletComponent, NgIf, MatTableModule],
})

export class MainComponentComponent implements OnInit{


  constructor(private httpConfig: HttpConfig) {
  }

  requests : number = 0;
  items : Item[] = [];
  displayedColumns: string[] = ['id', 'content', 'status','edit', 'delete'];
  ngOnInit() {
    this.getItems();
    this.getCounter();
  }



  getCounter():void{
     this.httpConfig.getCounter().subscribe(
      res => {
        this.requests = res as number;
      },
      err => {
        throw err;
      }
    );
  }

  getItems():void{
    this.httpConfig.getItems().subscribe(
      res => {
          this.items = res as Item[];
        this.getCounter();

      },
      err => {
        throw err;
      }
    );

  }

  addItem():void{
    this.httpConfig.addItem().subscribe(
      res => {
        this.getItems();
      },
      err => {
        throw err;
      }
    );

  }

  delete(id : number): void{
    this.httpConfig.delete(id).subscribe(
      res => {
        this.getItems();
      },
      err => {
        throw err;
      }
    );

  }


}
