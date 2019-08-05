import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicsService } from '../api/comics.service';
import { CartService } from '../api/cart.service';

@Component({
  selector: 'app-comic-description',
  templateUrl: './comic-description.page.html',
  styleUrls: ['./comic-description.page.scss'],
})
export class ComicDescriptionPage implements OnInit {

  id: any;
  sub: any;
  price: number = 0;
  description: any = "";
  title: any = "";
  comic: any;
  image: any = "";
  extension: any = "";
  published: any = "";
  date: any = "";
  quantity: number = 0;
  totalItem: number = 0;

  constructor(private router: Router, private route: ActivatedRoute,
    private cartService: CartService, private comicsService: ComicsService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getDescriptionComic(this.id);
    });
  }

  ngOnInit() {
  }


  getDescriptionComic(id: String) {
    let comic = this.comicsService.getDescriptionComic(id);
    comic.subscribe(
      data => {
        this.comic = data;
        this.title = this.comic.data.results[0]["title"]
        this.price = this.comic.data.results[0]["prices"][0]["price"]
        this.description = this.comic.data.results[0]["description"]
        this.image = this.comic.data.results[0]["thumbnail"]["path"]
        this.extension = this.comic.data.results[0]["thumbnail"]["extension"]
        this.date = this.comic.data.results[0]["dates"][0]["date"]
      }
    );
  }

  addCart(id) {
    if (this.quantity > 0) {
      //console.log(this.id + " " + this.title + " " + this.quantity + " " + this.price)
      this.cartService.addCartItem(this.id, this.title, this.quantity, this.price);
      console.log(this.cartService.cart)
      //this.router.navigate(['app/tabs/cart'])
      this.router.navigate(['cart'])
    }


  }

  addQuantity() {
    this.quantity += 1;
    this.cartService.addQuantityItem(this.id)
    //this.totalItem = parseFloat((this.price * this.quantity).toFixed(2));
    console.log("Quantity add: " + this.id)
  }


  subQuantity(id: number) {
    if (this.quantity >= 1) {
      this.quantity -= 1;
      this.cartService.subQuantityItem(this.id)
      //this.totalItem = parseFloat((this.price * this.quantity).toFixed(2));
      console.log("Quantity sub")
    }

  }




}
