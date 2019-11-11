import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { Profile, User } from '../entities/user';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
  providers: [Camera, CameraService]
})
export class EditUserPage implements OnInit {

  @Input()
  editingUser: User;

  profiles: Profile[];

  loading;

  constructor(private modalController: ModalController, private dbService: DBService, private loadingController: LoadingController, private toastController: ToastController, private cameraService: CameraService) {
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

    await this.dbService.update('usuarios', this.editingUser.uid, { name: this.editingUser.name, profileUID: this.editingUser.profileUID, photo: this.editingUser.photo });

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

  async takePicture() {
    this.editingUser.photo = await this.cameraService.takePicture();
  }
}
