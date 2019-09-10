import { Component } from '@angular/core';
import { User } from '../entities/user';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { DBService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ DBService ]
})
export class HomePage {

  newUser: User;

  lista: User[];

  constructor(private dbService: DBService) {
    this.lista = [];
    this.newUser = new User();
    this.inicializarUsuarios();
  }

  async inicializarUsuarios() {
    this.lista = await this.dbService.listWithUIDs<User>('usuarios');
  }

  adicionarUsuario() {
    alert('Usuário cadastrado com sucesso!');

    this.dbService.insert('usuarios', this.newUser);

    this.newUser = new User();
  }

  remove(key: string) {
    alert('Usuário removido com sucesso!');

    this.dbService.remove('usuarios', key);
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









