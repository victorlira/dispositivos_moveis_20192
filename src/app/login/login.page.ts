import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthenticationService]
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, public alertController: AlertController, private authService: AuthenticationService) { }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/home']);
      }).catch(error => {
        console.log(error);
        this.presentAlert('E-mail e/ou senha inválido(s).');
      });
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Login',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
