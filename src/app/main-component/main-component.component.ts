import {Component, OnInit, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpConfig} from "../HttpConfig";
import {MatListModule} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {ɵEmptyOutletComponent} from "@angular/router";
import {Item} from "./Item";
import {MatTable, MatTableModule} from "@angular/material/table";
import {AddingComponent} from "../adding/adding.component";
import {FormsModule} from "@angular/forms";
import {EditingComponent} from "../editing/editing.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {min} from "rxjs";



@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, NgForOf, ɵEmptyOutletComponent, NgIf, MatTableModule, AddingComponent, FormsModule, EditingComponent, MatFormFieldModule, MatSelectModule],
})

export class MainComponentComponent implements OnInit{


  constructor(private httpConfig: HttpConfig) {
  }

  @ViewChild(MatTable) table: MatTable<any> | undefined;
  addingShown : boolean = false;
  editingShown : boolean = false;
  requests : number = 0;
  sorting : string = '';
  items : Item[] = [];
  pickedId : number | undefined;
  displayedColumns: string[] = ['id', 'content', 'status','edit', 'delete'];
  ngOnInit() {
    this.getItems();
    this.getCounter();
  }

  sortItems() {
    if(this.sorting == 'idAsc'){
      this.items = this.items.sort((a,b) => a.id < b.id ? -1 : 1);
      this.table?.renderRows();
    } else if(this.sorting == 'idDesc') {
      this.items = this.items.sort((a,b) => a.id > b.id ? -1 : 1);
      this.table?.renderRows();
    } else if(this.sorting == 'statusDesc') {
      this.items = this.items.sort((a,b) => a.status > b.status ? -1 : 1);
      this.table?.renderRows();
    } else if(this.sorting == 'statusAsc') {
      this.items = this.items.sort((a,b) => a.status < b.status ? -1 : 1);
      this.table?.renderRows();
    }
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
    this.sorting = 'none';
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
