import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { Profile, User } from '../entities/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  @Input()
  editingUser: User;

  profiles: Profile[];

  loading;

  constructor(private modalController: ModalController, private dbService: DBService, private loadingController: LoadingController, private toastController: ToastController) {
    this.initialize();
   }

   async initialize() {
    await this.presentLoading();

    this.profiles = await this.dbService.listWithUIDs<Profile>('perfis');

    await this.hideLoading();
   }

   async hideLoading() {
    this.loading.dismiss();
   }

   async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando'
    });
    await this.loading.present();

  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async save() {
    await this.presentLoading();

    await this.dbService.update('usuarios', this.editingUser.uid, { name: this.editingUser.name, profileUID: this.editingUser.profileUID });

    await this.hideLoading();

    this.presentToast('Dados atualizados');

    this.dismiss();
  }

  async presentToast(displayMessage: string) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 2000
    });
    toast.present();
  }
}
