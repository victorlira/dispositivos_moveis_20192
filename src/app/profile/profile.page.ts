import { Component, OnInit } from '@angular/core';
import { Profile } from '../entities/user';
import { DBService } from '../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [DBService]
})
export class ProfilePage implements OnInit {

  newProfile: Profile;
  selectedDate: any;

  constructor(private dbService: DBService, public toastController: ToastController, private router: Router) {
    this.newProfile = new Profile();
   }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['home']);
  }

  async save() {
    const dateObject = new Date(this.selectedDate);
    this.newProfile.date = dateObject.getTime();

    await this.dbService.insertInList('perfis', this.newProfile);

    this.newProfile = new Profile();

    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Perfil cadastrado com sucesso.',
      duration: 2000
    });
    toast.present();
  }
}
