import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acquisitions',
  templateUrl: './acquisitions.page.html',
  styleUrls: ['./acquisitions.page.scss'],
})
export class AcquisitionsPage implements OnInit {

  acquisitions: Observable<any[]>;
  uId: any;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  acquisition: any;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, 
    private router: Router) {
    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          console.log(auth.uid)
          this.uId = auth.uid;
          this.getAll()
        }
      });
  }

  ngOnInit() {
  }

  async getAll() {
    this.itemsRef = this.db.list(this.uId + '/acquisitions');
    this.acquisitions = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }


  getPageAcquisition(key: any) {
    this.router.navigate(['/details', key])
  }


}
