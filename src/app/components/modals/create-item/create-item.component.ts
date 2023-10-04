import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { TYPES_PRODUCT } from 'src/app/core/constants/general';
import { SizeItem } from 'src/app/core/dtos/items';
import { SwiperModule } from 'swiper/angular';
import { NewItemFormComponent } from '../new-item-form/new-item-form.component';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ItemService } from 'src/app/services/item.service';
import { UtilsService } from 'src/app/services/utils.service';

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
    private itemService: ItemService,
    private utilsService: UtilsService,
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      typeProduct: [TYPES_PRODUCT.SIZES],
      quantity: [0, Validators.required],
      img: [''],
      sizes: [''],
      id: ['', Validators.required],
      cost: ['']
    });
  }

  async ngOnInit() {
    const loading = await this.utilsService.showLoading()
    let idApp = await this.utilsService.getIdApp();
    this.form.patchValue({
      id: ++idApp
    });
    await this.utilsService.setIdApp(idApp);
    loading.dismiss();
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  async confirm() {
    const loading = await this.utilsService.showLoading();

    const selectedStore = await this.storage.get('selectedStore');
    const res = await this.itemService.createItemStore(Number(selectedStore), this.form.value);
    loading.dismiss();
    return this.modalCtrl.dismiss(true);
  }

  async uploadPhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      quality: 100,
      width: 300,
      height: 300
    });
    console.log(photo)
    this.form.patchValue({
      img: `data:image/${photo.format};base64,${photo.base64String}`
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
    const loading = await this.utilsService.showLoading()
    let idApp = await this.utilsService.getIdApp();
    const newSize: SizeItem = {
      id: ++idApp,
      idFather: this.form.get('id')?.value,
      name: item.name,
      quantity: item.quantity
    }
    await this.utilsService.setIdApp(idApp);
    this.sizes.push(newSize);
    this.form.patchValue({
      sizes: this.sizes,
      quantity: item.quantity + Number(this.form.get('quantity')?.value)
    })
    loading.dismiss();
  }

}
