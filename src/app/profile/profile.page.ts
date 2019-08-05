import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public toastCtrl: ToastController, private router: Router,
    private alertController: AlertController, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }


  async presentToast(msg: string) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    await toast.present();
  }



  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  pageAbout() {
    this.router.navigate(['/about']);
  }


  async showAlertLogout() {
    const alert = await this.alertController.create({
      header: 'Logout?',
      message: 'Deseja deslogar da sua conta?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.logout()
            console.log('Logout...');
          }
        }, {
          text: 'Não',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }


  pageChangeAcquisitions(){
    this.router.navigate(['/acquisitions']);

  }

  pageChangePassword() {
    this.router.navigate(['/password']);
  }
}
