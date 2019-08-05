import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../api/characters.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character-description',
  templateUrl: './character-description.page.html',
  styleUrls: ['./character-description.page.scss'],
})
export class CharacterDescriptionPage implements OnInit {


  character: any; 
  name: any;
  description: any;
  image: any;
  extension: any;
  id: any;
  sub: any;
  comics: any;

  constructor(private router: Router, private route: ActivatedRoute, private charactersService: CharactersService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getDescriptionCharacter(this.id);
      console.log(this.id)
    });
  }

  ngOnInit() {
  }


  getDescriptionCharacter(id: String) {
    let character = this.charactersService.getDescriptionCharacter(id);
    character.subscribe(
      data => {
        this.character = data;
        this.name = this.character.data.results[0]["name"]
        this.description = this.character.data.results[0]["description"]
        this.image = this.character.data.results[0]["thumbnail"]["path"]
        this.comics = this.character.data.results[0]["comics"]["items"]
        console.log(this.comics)
        this.extension = this.character.data.results[0]["thumbnail"]["extension"]
        console.log(this.character.data.results[0])
      }
    );
  }
}
