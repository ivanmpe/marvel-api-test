import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  constructor(public toastCtrl: ToastController, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  form_changePassword(f: NgForm) {
    if (!f.valid) {
      return;
    } console.log(f.controls.newPassword.value, f.controls.againNewPassword.value);
    this.changePassword(f.controls.newPassword.value, f.controls.againNewPassword.value);
  }

  async presentToast(msg: string) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    await toast.present();
  }

  changePassword(newPassword: string, againNewPassword: string) {

    console.log(newPassword);
    if (newPassword === againNewPassword) {
      if (newPassword.length > 5) {
        this.afAuth.auth.currentUser.updatePassword(newPassword).then(ok => {
          this.presentToast('Senha atualizada com sucesso! ');
        });

      } else {
        this.presentToast(' Use senhas acima de 6 digitos. ')
      }

    } else {
      this.presentToast('As senhas não são iguais')
    }

  }

}
