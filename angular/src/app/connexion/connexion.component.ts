import { Component, OnInit } from '@angular/core';
import { AuthentificationService, TokenPayload} from '../services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  data: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
  }

  connexion(): void {
    this.auth.connexion(this.data).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      (erreur) => {
        console.error(erreur);
      }
    );
  }

}
