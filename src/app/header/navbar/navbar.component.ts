import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userName = 'Accedi';

  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    this.authservice.autSubject.subscribe((val) => {
      if (val !== null) {
        this.userName = 'Ciao ' + val?.user.firstname;
      }
    });
  }
}
