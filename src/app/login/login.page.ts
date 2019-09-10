import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }


  login() {
    this.presentAlert();
    this.router.navigate(['/home']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login',
      message: 'Login realizado com sucesso.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
