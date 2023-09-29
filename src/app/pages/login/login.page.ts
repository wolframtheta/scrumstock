import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { LoginDTO } from 'src/app/core/dtos/login';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    username: [environment.production ? '' : 'xaviermarques4f@gmail.com', Validators.required],
    password: [environment.production ? '' : 'Aobcd8663', Validators.required]
  });
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storage: Storage,
    private navController: NavController
  ) { }

  ngOnInit() {
  }

  async login() {
    this.isLoading = true;
    const body: LoginDTO = {
      identifier: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }
    try {
      const res: any = await this.authService.login(body);
      console.log(res)
      await this.storage.set('token', res);
      this.navController.navigateForward('/home')
    } catch {
      this.isLoading = false;
    }
    this.isLoading = false;
  }

}
