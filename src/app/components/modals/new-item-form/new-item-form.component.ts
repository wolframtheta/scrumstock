import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class NewItemFormComponent  implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private modal: ModalController
  ) { }

  form!: FormGroup;
  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
    })
  }

  saveSize() {
    this.modal.dismiss(this.form.value);
  }

}
