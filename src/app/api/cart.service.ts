import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any = [];
  constructor() {
    this.cart = [];
  }

  getCart(): [] {
    return this.cart
  }

  addCartItem(id: number, title: String, quantity: number, price: number) {
    console.log(id + " " + title + " " + quantity + " " + price)
   
    if (this.cart.length == 0) {
      this.cart.push({ id: id, title: title, quantity: quantity, price: price })
    } else {
      var index = this.cart.map(function (item) { return item.id; })
        .indexOf(id);
      if (index != -1) {
        this.cart[index].quantity += 1
      }else {
        this.cart.push({ id: id, title: title, quantity: quantity, price: price })
      }
    }
  }

  removeCartItem(id: number): void {
    var index = this.cart.map(function (item) { return item.id; })
      .indexOf(id);
    ~index && this.cart.splice(index, 1);
  }

  cleanCart() {
    while (this.cart.length > 0)
      this.cart.pop();
  }

  addQuantityItem(id: number) {
    for (var i in this.cart) {
      if (this.cart[i].id == id) {
        this.cart[i].quantity += 1;
        console.log("Quantidade: " + this.cart[i].quantity)
        break;
      }
    }
  }

  subQuantityItem(id: number) {
    for (var i in this.cart) {
      if (this.cart[i].id == id) {
        if (this.cart[i].quantity > 0) {
          console.log(this.cart[i].quantity)
          this.cart[i].quantity -= 1;
          if (this.cart[i].quantity == 0)
            this.removeCartItem(id);
          break;
        }
      }
    }
  }

  totalCart(){
    return this.sum(this.getCart())
  }

  sum(array: any): number {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
      var sumItem = array[i].quantity * array[i].price
      total += sumItem;
    }
    return Number(total.toFixed(2));
  }






}
