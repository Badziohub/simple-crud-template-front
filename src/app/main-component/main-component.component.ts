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
import {AddingComponent} from "../adding/adding.component";
import {FormsModule} from "@angular/forms";
import {EditingComponent} from "../editing/editing.component";



@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, NgForOf, ɵEmptyOutletComponent, NgIf, MatTableModule, AddingComponent, FormsModule,EditingComponent],
})

export class MainComponentComponent implements OnInit{


  constructor(private httpConfig: HttpConfig) {
  }

  addingShown : boolean = false;
  editingShown : boolean = false;
  requests : number = 0;
  items : Item[] = [];
  pickedId : number | undefined;
  displayedColumns: string[] = ['id', 'content', 'status','edit', 'delete'];
  ngOnInit() {
    this.getItems();
    this.getCounter();
  }

  toggleAdding(){
    this.addingShown = !this.addingShown;
  }

  toggleEditing(id : number){

    if(this.editingShown == true && this.pickedId == id) {
      this.editingShown = !this.editingShown;
    } else if(this.editingShown == true && this.pickedId != id) {
      this.editingShown = !this.editingShown;
    } else {
      this.pickedId = id;
      this.editingShown = !this.editingShown;
    }

  }

//wiem ze subscribe jest deprecated, ale tu mi pasuje, a zaden ze mnie pro front
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
