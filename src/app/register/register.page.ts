import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, AfterViewInit {

  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  @ViewChild('partOneInput', {static: false})  partOneElement: IonInput;
  @ViewChild('partTwoElement', {static: false})  partTwoElement: IonInput;

  areaCode: number;
  partOne: number;
  partTwo: number;

  code: number;

  isValid: boolean;

  isSMSSent: boolean;

  confirmationResult: firebase.auth.ConfirmationResult;

  isLoadingSMS: boolean;

  constructor(private router: Router) {
    firebase.initializeApp(environment.firebase);
  }

  ngOnInit() {
    console.log('inicializado');
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  ngAfterViewInit() {

  }

  updateIsValid() {
    this.isValid =
      this.areaCode && this.areaCode.toString().length === 2 &&
      this.partOne && this.partOne.toString().length === 5 &&
      this.partTwo && this.partTwo.toString().length === 4;
  }

  areaCodeChange() {
    this.updateIsValid();

    if (this.areaCode > 9) {
      this.partOneElement.setFocus();
    }
  }

  partOneChange() {
    this.updateIsValid();

    if (this.partOne > 9999) {
      this.partTwoElement.setFocus();
    }
  }

  partTwoChange() {
    this.updateIsValid();
  }

  async sendSMS() {
    const appVerifier = this.recaptchaVerifier;

    const phoneNumberString = '+55' + this.areaCode.toString() + this.partOne.toString() + this.partTwo.toString();

    this.confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier);

    this.isSMSSent = true;
    }

    codeChange() {
      if (this.code && this.code.toString().length === 6) {
        this.isLoadingSMS = true;

        this.confirmationResult.confirm(this.code.toString())
          .then(result => {
            this.router.navigate(['users']);
          }).catch(error => {
              console.log(error);
              this.isLoadingSMS = false;
          });
      }
    }
}
