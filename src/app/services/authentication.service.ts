import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DBService } from './db.service';
import { User, Profile } from '../entities/user';

@Injectable()
export class AuthenticationService {

    constructor(private afAuth: AngularFireAuth, private dbService: DBService) {

    }

    async isAdmin() {
        return new Promise<boolean>((resolve, reject) => {
            this.afAuth.user
            .subscribe(async user => {
                const userFromDB = (await this.dbService.search<User>('usuarios', 'email', user.email))[0];
                const profileFromDB = await this.dbService.getObjectByKey<Profile>('perfis', userFromDB.profileUID);

                resolve(profileFromDB.isAdmin === true);
            });
        });
    }

    login(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }
}