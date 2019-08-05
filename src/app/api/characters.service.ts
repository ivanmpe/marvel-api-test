import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  apiKey = "f0f9dbea302f60ec236962eadd11af09"
  characters;
  obj: any;

  constructor(private http: HttpClient) {
  }



  getAllCharacters(offset: number) {
    if (this.characters) {
      return Promise.resolve(this.characters);
    }

    return new Promise((resolve, reject) => {
      var timestamp = Number(new Date());
      var hash = Md5.hashStr(timestamp + 'ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a');
      var url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&orderBy=name&limit=30&offset=${offset}&apikey=d8b23f3429d72898aaffd1a321761b4a&hash=${hash}`;
      this.http.get(url).subscribe(data => {
        this.characters = data;
        console.log(this.characters["data"]["results"])
        resolve(this.characters);
      });
    });
  }


  encodeQueryData(data) {
    let ret = [];
    for (let d in data) {
      if (data[d].value == undefined) {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      }
      else {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d].value));
      }
    }
    return ret.join('&');
  }


  getHeroAll(filter: string): Observable<any> {
    var timestamp = Number(new Date());
    var hash = Md5.hashStr(timestamp + 'c6d627c0a8fb80a61752e031dd30a4d4d2fafffef0f9dbea302f60ec236962eadd11af09');
    var url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&` +
      filter + `&apikey=f0f9dbea302f60ec236962eadd11af09&hash=${hash}`
    console.log(url)
    return this.http.get(url);
  }

  getDescriptionCharacter(id: any) {
    let md5 = new Md5();
    var timestamp = Number(new Date());
    var hash = Md5.hashStr(timestamp + 'c6d627c0a8fb80a61752e031dd30a4d4d2fafffef0f9dbea302f60ec236962eadd11af09');
    var url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timestamp}&apikey=f0f9dbea302f60ec236962eadd11af09&hash=${hash}`
    return this.http.get(url);
  }


}
