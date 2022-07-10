import { Component, OnInit} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {

  registerForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private formBuilder: FormBuilder,
    private authService:AuthService,
    private snackbar:MatSnackBar,
    private router:Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
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

  signUp() {
    this.authService.signUp(this.registerForm.value)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      err => this.openSnackBar(err.error,'Chiudi'),
    );
  }
}
