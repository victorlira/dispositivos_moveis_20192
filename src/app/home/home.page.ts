import { Component } from '@angular/core';
import { User, Profile } from '../entities/user';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { DBService } from '../services/db.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ DBService, AuthenticationService]
})
export class HomePage {

  newUser: User;

  lista: User[];

  perfis: Profile[];

  isAuthenticatedUserAdmin: boolean;

  loading: any;

  constructor(private dbService: DBService, private authService: AuthenticationService, public loadingController: LoadingController) {
    this.lista = [];
    this.newUser = new User();

    this.presentLoading();

    this.inicializarDadosLogin();
    this.inicializarPerfis();
    this.inicializarUsuarios();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Aguarde'
    });
    await this.loading.present();

  }

  async inicializarDadosLogin() {
    this.isAuthenticatedUserAdmin = await this.authService.isAdmin();

    this.loading.dismiss();
  }

  async inicializarPerfis() {
    this.perfis = await this.dbService.listWithUIDs<Profile>('perfis');
  }

  async inicializarUsuarios() {
    this.lista = await this.dbService.listWithUIDs<User>('usuarios');
  }

  async adicionarUsuario() {
    await this.dbService.insertInList('usuarios', this.newUser);

    this.inicializarUsuarios();

    alert('Usuário cadastrado com sucesso!');

    this.newUser = new User();
  }

  async remove(key: string) {
    await this.dbService.remove('usuarios', key);

    alert('Usuário removido com sucesso!');

    this.inicializarUsuarios();
  }

  edit(usuario) {
    usuario.isEditing = true;
  }

  cancelEdit(usuario) {
    usuario.isEditing = false;
  }

  confirmEdit(usuario) {
    this.dbService.update('usuarios', usuario.uid, { email: usuario.email, name: usuario.name } );
    usuario.isEditing = false;
  }
}









