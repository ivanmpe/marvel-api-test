import { Component, OnInit } from '@angular/core';
import { CartService } from '../api/cart.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart = []
  totalCart: number = 0;
  cartEmpty: boolean  = true;

  constructor(private cartService: CartService, public alertController: AlertController, private router: Router) {
    this.totalCart = this.cartService.totalCart()
    console.log(this.cartService.cart)
    if (this.cartService.cart.length != 0) {
      this.cartEmpty = false;
    }
  }

  ngOnInit() {
  
  }


  removeItem(id: any) {
    this.cartService.removeCartItem(id);
  }

  async showConfirmDeleteAll() {
    const alert = await this.alertController.create({
      header: 'Esvaziar Carrinho',
      message: 'Você deseja apagar todos os itens do carrinho? ',
      buttons: [
        {
          text: 'Deletar tudo',
          handler: () => {
            this.cartEmpty = true;
            this.cartService.cleanCart();
            console.log('Deletar tudo');
          }
        }
      ]
    });
    await alert.present();
  }

  sumQuantity(id: any) {
    this.cartService.addQuantityItem(id);
    this.totalCart = this.cartService.sum(this.cartService.cart);
  }

  subQuantity(id: any) {
    this.cartService.subQuantityItem(id);
    this.totalCart = this.cartService.sum(this.cartService.cart);
    if(this.cartService.cart.length == 0 )
      this.cartEmpty == true
  }

  pagePayment() {
    this.router.navigate(['/payment']);
  }

  pageComic(id) {
    this.router.navigate(['comic-description/', id]);
  }

 
}
