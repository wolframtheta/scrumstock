import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemDTO, SizeItem } from 'src/app/core/dtos/items';
import { Storage } from '@ionic/storage-angular';
import { ItemService } from 'src/app/services/item.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PhotoService } from 'src/app/services/photo.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    private utilsService: UtilsService,
    public router: Router,
    private photoService: PhotoService,
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

  changeNameItem(event: any, item: SizeItem) {
    item.name = event.detail.value
    this.itemService.modifyItem(this.item);
  }

  async addNewSize(item: ItemDTO) {
    let idApp = await this.utilsService.getIdApp()
    const newSize: SizeItem = {
      id: ++idApp,
      idFather: item.id,
      name: '',
      quantity: 0
    }
    this.item.sizes?.push(newSize);
    this.itemService.modifyItem(this.item);
    await this.utilsService.setIdApp(idApp);
  }

  async uploadPhoto() {
    const photo = await this.photoService.takePhoto();
    if (photo.base64String) {
      const imgCompress = await this.photoService.compressBase64(photo.base64String, 1, 500, 500)
      if (imgCompress) {
        this.item.img = imgCompress + '';
        this.itemService.modifyItem(this.item);
      }
    }
  }
}
