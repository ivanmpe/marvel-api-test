import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isTextFieldType: boolean = false;

  constructor(private afAuth: AngularFireAuth, private router: Router, public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async presentToast(msg: string) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  pageRegister() {
    this.router.navigate(['/register']);
  }

  form_login(f: NgForm) {
    this.afAuth.auth.signInWithEmailAndPassword(f.controls.email.value, f.controls.password.value).then(ok => {
      this.router.navigate(['app/tabs/comics']);
    }).catch((error) => {
      this.presentToast(error);
    });

  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }




}
