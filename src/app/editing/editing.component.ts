import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MainComponentComponent} from "../main-component/main-component.component";
import {Item} from "../main-component/Item";
import {HttpConfig} from "../HttpConfig";

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
  ],
  styleUrls: ['./editing.component.scss']
})
export class EditingComponent {

  constructor( private mainComp : MainComponentComponent, private httpConfig: HttpConfig,) {
  }

  item: Item | undefined = this.mainComp.items.find(value => value.id == this.mainComp.pickedId);
  id : number | undefined = this.item?.id;
  content: string | undefined = this.item?.content;
  status: string | undefined = this.item?.status;

  updateItem(){
  let item = {
    content: this.content,
    status: this.status
  };
    this.httpConfig.updateItem(this.id as number,item).subscribe(
      res => {
        this.mainComp.getItems();
        this.mainComp.toggleEditing(this.id as number);
      },
      err => {
        throw err;
      }
    );
}

}
