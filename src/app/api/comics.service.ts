import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ComicsService {



  constructor(private http: HttpClient) {
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


  getAllComics(filter: string): Observable<any> {
    var timestamp = Number(new Date());
    var hash = Md5.hashStr(timestamp + 'c6d627c0a8fb80a61752e031dd30a4d4d2fafffef0f9dbea302f60ec236962eadd11af09');
    var url = `https://gateway.marvel.com:443/v1/public/comics?ts=${timestamp}&` +
      filter + `&apikey=f0f9dbea302f60ec236962eadd11af09&hash=${hash}`
    console.log(url)
    return this.http.get(url);
  }

  getDescriptionComic(id: any) {
    let md5 = new Md5();
    var timestamp = Number(new Date());
    var hash = Md5.hashStr(timestamp + 'c6d627c0a8fb80a61752e031dd30a4d4d2fafffef0f9dbea302f60ec236962eadd11af09');
    var url = `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=${timestamp}&apikey=f0f9dbea302f60ec236962eadd11af09&hash=${hash}`
    return this.http.get(url);
  }

}
