import { Component, OnInit } from '@angular/core';
import {AuthentificationService, TokenPayload} from '../services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  data: TokenPayload = {
    email: '',
    password: '',
    nom: '',
    age: 0,
    famille: '',
    race: '',
    nourriture: ''
  };

  constructor(private auth: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
  }

  inscription(): void {
    this.auth.inscription(this.data).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
