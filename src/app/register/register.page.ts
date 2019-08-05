import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isTextFieldType: boolean = false;
  isTextFieldType2: boolean = false;

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }

  form_register(f: NgForm) {
    if (!f.valid) {
      this.presentToast("Insira os dados.");
      return;
    }
    if (f.controls.password.value == f.controls.password2.value) {
      this.afAuth.auth.createUserWithEmailAndPassword(f.controls.email.value, f.controls.password.value).then(ok => {
        this.presentToast('Cadastro realizado com sucesso!');
        this.router.navigate['']

      }).catch((e) => {
        this.presentToast(e);
      });
    } else {
      this.presentToast("As senhas são diferentes! ")
    }

  }

  async presentToast(msg: string) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  togglePasswordFieldType(){
    this.isTextFieldType = !this.isTextFieldType;
  }
  toggleSecondPasswordFieldType(){
    this.isTextFieldType2 = !this.isTextFieldType2;
  }



  
}
