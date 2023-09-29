import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ItemDTO, SizeItem } from 'src/app/core/dtos/items';
import { Storage } from '@ionic/storage-angular';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})
export class DetailPage implements OnInit {

  item: ItemDTO;
  columns = [
    {
      id: 'size',
      title: 'Talla',
    },
    {
      id: 'quantity',
      title: 'Cantidad',
    },

  ]
  editMode: boolean = false;
  constructor(
    private storage: Storage,
    private itemService: ItemService,
    ) {
    this.item = window.history.state?.item;
  }

  async ngOnInit() {
    this.editMode = await this.storage.get('editMode');
  }

  add(size: SizeItem) {
    this.item?.sizes?.map(s => {
      if (s.id === size.id) {
        ++s.quantity;
      }
      return s;
    });
    ++this.item.quantity;
    this.itemService.modifyItem(this.item);
  }

  remove(size: SizeItem) {
    this.item?.sizes?.map(s => {
      if (s.id === size.id) {
        --s.quantity;
      }
      return s;
    });
    --this.item.quantity;
    this.itemService.modifyItem(this.item);
  }
}
