import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  userName = 'Accedi';

  isLogged:boolean = false;

  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    this.authservice.autSubject.subscribe((val) => {
      if (val !== null) {
        this.userName = 'Ciao ' + val?.user.firstname;
        this.isLogged = true;
      } else {
        this.userName = 'Accedi';
      }
    });
  }

  logout() {
    this.authservice.logout();
    this.isLogged = false;
  }
}
