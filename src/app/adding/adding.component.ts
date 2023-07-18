import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from "@angular/material/radio";
import {HttpConfig} from "../HttpConfig";
import {MainComponentComponent} from "../main-component/main-component.component";

@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  styleUrls: ['./adding.component.scss']
})
export class AddingComponent {

  content : string = '';
  status : string = '';
  addButtonDisabled : boolean = (this.content == '');
  constructor(private httpConfig: HttpConfig, private mainComp : MainComponentComponent) {
  }

  addButtonUpdate(){
    this.addButtonDisabled = (this.content == '' || this.status == '') ;
  }

  sendItem(){
    let item = {
      content : this.content,
      status : this.status
    };

    this.httpConfig.addItem(item).subscribe(
      res => {
        this.mainComp.getItems();
        this.mainComp.toggleAdding();
      },
      err => {
        throw err;
      }
    );
  }
}
