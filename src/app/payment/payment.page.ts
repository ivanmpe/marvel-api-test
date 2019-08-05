import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { CartService } from '../api/cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  uId;

  constructor(private router: Router, private alertController: AlertController,
    public loadingController: LoadingController, private cartService: CartService,
    private auth: AngularFireAuth, private db: AngularFireDatabase) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.uId = user.uid;
      } else {
        this.uId = null;
      }
    });


  }

  ngOnInit() {
  }


  async showMessagePayment() {
    const alert = await this.alertController.create({
      header: 'Compra finalizada! ',
      message: 'Obrigado! Sua compra foi realizada com sucesso.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.addFirebaseDatabase()
            console.log('Compra finalizada com sucesso!');
          }
        }
      ]
    });
    await alert.present();

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Processando...',
      duration: 3000
    });

    await loading.present()

    await loading.onDidDismiss().then((dis) => {
      this.showMessagePayment();
    });

  }

  payment() {
    this.cartService.cleanCart();
    this.router.navigate(['app/tabs/comics']);
  }

  addFirebaseDatabase() {
    var total = this.cartService.sum(this.cartService.cart)
    var datetime = this.generateDate();
    console.log(this.uId)
    this.db.list(this.uId + '/acquisitions/').push( {list : this.cartService.cart})
      .then((result: any) => {
        console.log(result.key);
        this.db.list(this.uId + '/acquisitions').update( result.key, { datetime: datetime, total: total } );
      });
      this.payment();
  }

  generateDate(){
    var date = new Date();
    console.log(date.getTime())
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds()
    var day = date.getDate();
    var month = date.getMonth()+1 ;
    var year = date.getFullYear();
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;

  }
}
