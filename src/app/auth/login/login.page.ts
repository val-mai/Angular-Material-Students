import { Component, OnInit} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { MatSnackBar,MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private formBuilder: FormBuilder,
    private authservice:AuthService,
    private snackbar:MatSnackBar,
    private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : new FormControl ('',[Validators.required, Validators.email]),
      password : ['', Validators.required],
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      panelClass: ['mat-toolbar', 'mat-warn'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  login() {
    this.authservice.login(this.loginForm.value).
    subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/students']);
      },
      err => this.openSnackBar(err.error,'Chiudi'),
    )
  }
}
