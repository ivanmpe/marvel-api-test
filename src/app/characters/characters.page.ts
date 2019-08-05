import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../api/characters.service';
import { ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import {  Router } from '@angular/router';



@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})


export class CharactersPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;


  searchEmpty: boolean = true;
  characters: any;
  obj: any
  public limit: number = 20;
  public offset: number = 0;

  constructor(private charactersService: CharactersService, private router: Router) {
    this.getAllCharacters({ orderBy: 'name', limit: this.limit, offset: this.offset });
  }

  ngOnInit() {
  }
  
  searchHeroes(searchQuery) {
    console.log(this.charactersService.encodeQueryData(searchQuery));
    let usersObservable: Observable<[any]>;
    usersObservable = this.charactersService.getHeroAll(this.charactersService.encodeQueryData(searchQuery));
    this.obj = [];
    usersObservable.subscribe(
      data => {
        this.obj = data;
        this.characters = this.obj.data.results;
        console.log(this.characters)
      }
    );
  }


  onSearchChange(ev: any) {
    const val = ev.target.value;

    if(val || val.trim() != '' ){
      setTimeout(() => {
        this.searchHeroes({orderBy: 'name', nameStartsWith: val, limit: this.limit});
      }, 100)
      this.searchEmpty = false;
    }
    else {
      this.searchEmpty = true;
      this.getAllCharacters({ orderBy: 'name', limit: this.limit, offset: this.offset });
    }
  }

  
  loadData(event) {
    setTimeout(() => {
      this.getAllCharacters({ orderBy: 'name', limit: this.limit, offset: this.offset });
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.characters.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  getAllCharacters(queryString) {
    console.log(queryString);
    let usersObservable: Observable<[any]>;
    usersObservable = this.charactersService.getHeroAll(this.charactersService.encodeQueryData(queryString));
    this.obj = [];
    usersObservable.subscribe(
      data => {
        this.obj = data;
        if (this.characters != null) {
          this.obj.data.results.forEach(element => {
            this.characters.push(element);
          });
        }
        else {
          this.characters = this.obj.data.results;
        }
        this.offset += 20;

      });
  }
  
  
  pageDescription(id: any){
    this.router.navigate(['character-description', id])
  }




}
