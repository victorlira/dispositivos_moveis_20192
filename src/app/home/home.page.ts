import { Component } from '@angular/core';
import { User } from '../entities/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  newUser: User;

  lista: User[];

  constructor() {
    this.newUser = new User();

    this.lista =
    [
      { name: 'Victor Lira', email: 'vl@cin.ufpe.br' },
      { name: 'Fulano', email: 'fulano@gmail.com'}
    ];
  }

  adicionarUsuario() {
    alert('Usuário cadastrado com sucesso!');

    this.lista.push(this.newUser);
    this.newUser = new User();
  }

  remove(deletingUser: User) {
    console.log('remove clicado');
    this.lista  = this.lista.filter(u => u.email !== deletingUser.email);
  }
}
