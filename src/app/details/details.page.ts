import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  uId: any;
  acquisition: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  sub;
  id: any;
  datetime: Observable<any>;
  item: Observable<any>;


  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router,
    private route: ActivatedRoute, ) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
    });

    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          console.log(auth.uid)
          this.uId = auth.uid;
          this.getDetails(this.id)
          this.item = db.object(this.uId + '/acquisitions/' + this.id ).valueChanges();
        }
      });
  }


  ngOnInit() {
  }

  getDetails(id: any) {
    this.itemsRef = this.db.list(this.uId + '/acquisitions/' + id + '/list');
    this.acquisition = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getDatetime(id: any) {
    this.itemsRef = this.db.list(this.uId + '/acquisitions/' + id + '/datetime');
    this.acquisition = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

}
