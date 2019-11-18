import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import { User, Profile } from '../entities/user';
import { ModalController } from '@ionic/angular';
import { EditUserPage } from '../edit-user/edit-user.page';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  providers: [LocalNotifications]
})
export class UsersPage implements OnInit {

  perfis: Profile[];
  users: User[];

  constructor(private dbService: DBService, private modalController: ModalController, private localNotifications: LocalNotifications) {
    this.inicializarDados();
  }

  generateNotification(userName: string, changeDescription: string) {
    this.localNotifications.schedule({
      id: 1,
      title: 'Notificação',
      text: `O cadastro de ${userName} foi ${changeDescription}!`,
      sound: 'file://sound.mp3'
    });
  }

  async inicializarDados() {
    this.perfis = await this.dbService.listWithUIDs<Profile>('perfis');

    this.dbService.listAndWatch<User>('usuarios')
      .subscribe(newList => {
        let userName = '';
        let changeDescription = '';

        if (this.users) {
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].confirmed !== newList[i].confirmed) {
              userName = this.users[i].name;
              changeDescription = newList[i].confirmed ? 'Aprovado' : 'Resetado';
            }
          }
          this.generateNotification(userName, changeDescription);
        }

        this.users = newList;

        this.updateProfiles();
      });
  }

  private updateProfiles() {
    this.users.forEach(user => {
      const perfil = this.perfis.filter(p => p.uid === user.profileUID)[0];
      user['profile'] = perfil;
    });
  }

  ngOnInit() {
  }

  async edit(user: User) {
    const modal = await this.modalController.create({
      component: EditUserPage,
      componentProps: {
        editingUser: user
      }
    });
    return await modal.present();
  }
}
