import { Component, OnInit } from '@angular/core';
import { AuthentificationService, Marsupilami} from '../services/authentification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data: Marsupilami;

  constructor(private auth: AuthentificationService) { }

  ngOnInit(): void {
    this.auth.profile().subscribe(
      (marsupilami) => {
        this.data = marsupilami;
      },
      (erreur) => {
        console.error(erreur);
      }
    );
  }

}
