import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreCreateComponent  implements OnInit {
  storeForm!: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.storeForm = this.formBuilder.group({
      name: '',
      img: '',
      users: []
    })
  }

  async ngOnInit() {
    this.storeForm = this.formBuilder.group({
      name: ['', Validators.required],
      img: ['', Validators.required],
      users: [(await this.authService.getToken()).user.username, Validators.required]
    })
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss(this.storeForm.value);
  }
  async uploadPhoto() {

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      quality: 100
    });
    console.log(photo);
    this.storeForm.patchValue({
      img: `data:image/${photo.format};base64,${photo.base64String}`
    })
  }
}
