import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import { User, Profile } from '../entities/user';
import { ModalController } from '@ionic/angular';
import { EditUserPage } from '../edit-user/edit-user.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {

  perfis: Profile[];
  users: User[];

  constructor(private dbService: DBService, private modalController: ModalController) {
    this.inicializarDados();
  }

  async inicializarDados() {
    this.perfis = await this.dbService.listWithUIDs<Profile>('perfis');
    this.users = await this.dbService.listWithUIDs<User>('usuarios');

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
