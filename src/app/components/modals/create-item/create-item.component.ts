import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { TYPES_PRODUCT } from 'src/app/core/constants/general';
import { SizeItem } from 'src/app/core/dtos/items';
import { SwiperModule } from 'swiper/angular';
import { NewItemFormComponent } from '../new-item-form/new-item-form.component';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    SwiperModule,
    NewItemFormComponent
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateItemComponent  implements OnInit {

  form!: FormGroup;
  TYPES_PRODUCT = TYPES_PRODUCT;
  sizes: SizeItem[] = [];
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private itemService: ItemService
  ) {
    this.form = formBuilder.group({
      name: [''],
      price: [''],
      typeProduct: [TYPES_PRODUCT.SIZES],
      quantity: [''],
      photo: [''],
      sizes: ['']
    });
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss();
  }

  async confirm() {
    const selectedStore = await this.storage.get('selectedStore');

    const res = await this.itemService.createItemStore(Number(selectedStore), this.form.value);
    return this.modalCtrl.dismiss(true);
  }

  async uploadPhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      quality: 100
    });
    console.log(photo);
    this.form.patchValue({
      photo: `data:image/${photo.format};base64,${photo.base64String}`
    })
  }

  async createElement() {

    const modal = await this.modalCtrl.create({
      component: NewItemFormComponent,
      componentProps: {},
      cssClass: 'modal-resized',
    })
    await modal.present();
    const res = await modal.onDidDismiss()
    if (res.data) {
      this.saveSize(res.data);
    }
  }

  async saveSize(item: any) {
    let idApp = await this.storage.get('idApp');
      await this.storage.set('idApp', ++idApp)
      const newSize: SizeItem = {
        id: ++idApp,
        idFather: idApp,
        name: item.name,
        quantity: item.quantity
      }
      await this.storage.set('idApp', ++idApp)
      this.sizes.push(newSize);
  }

}
