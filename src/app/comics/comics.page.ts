import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../api/comics.service';
import { ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss'],
})
export class ComicsPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;


  public comics: any;
  public obj: any
  public limit: number = 10;
  public offset: number = 0;
  public searchEmpty: boolean = true;


  constructor(private router: Router, private comicsService: ComicsService) {
    this.getAllComics({ orderBy: 'title', limit: this.limit, offset: this.offset });
  }

  ngOnInit() {
  }



  loadData(event) {
    setTimeout(() => {
      this.getAllComics({ orderBy: 'title', limit: this.limit, offset: this.offset });
      event.target.complete();
      if (this.comics.length == 10000) {
        event.target.disabled = true;
      }
    }, 1000);
  }



  searchComics(searchQuery) {
    let usersObservable: Observable<[any]>;
    usersObservable = this.comicsService.getAllComics(this.comicsService.encodeQueryData(searchQuery));
    this.obj = [];
    usersObservable.subscribe(
      data => {
        this.obj = data;
        this.comics = this.obj.data.results;
      }
    );
  }


  getAllComics(queryString) {
    let usersObservable: Observable<[any]>;
    usersObservable = this.comicsService.getAllComics(this.comicsService.encodeQueryData(queryString));
    this.obj = [];
    usersObservable.subscribe(
      data => {
        this.obj = data;
        if (this.comics != null) {
          this.obj.data.results.forEach(element => {
            this.comics.push(element);
          });
        }
        else {
          this.comics = this.obj.data.results;
        }
        this.offset += 10;
      });
  }


  onSearchChange(ev: any) {
    const val = ev.target.value;
    if (val || val.trim() != '') {
      setTimeout(() => {
        this.searchComics({ orderBy: 'title', titleStartsWith: val, limit: this.limit });
      }, 500)
      this.searchEmpty = false;
    }
    else {
      this.searchEmpty = true;
      this.getAllComics({ orderBy: 'title', limit: this.limit, offset: this.offset });
    }
  }

  pageCart() {
    this.router.navigate(['cart'])
  }


  pageComic(id: any) {
    console.log(id)
    this.router.navigate(['comic-description/', id]);
  }

}
