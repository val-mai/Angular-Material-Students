import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  studentForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  setAction: string = 'Aggiungi';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      studentLast: ['', Validators.required],
      studentMail: new FormControl('', [Validators.required, Validators.email]),
      studentCity: [''],
      studentDOB: [''],
      studentCourse: ['', Validators.required],
    });

    if (this.editData) {
      this.studentForm.controls['studentName'].setValue(
        this.editData.studentName
      );
      this.studentForm.controls['studentLast'].setValue(
        this.editData.studentLast
      );
      this.studentForm.controls['studentMail'].setValue(
        this.editData.studentMail
      );
      this.studentForm.controls['studentCity'].setValue(
        this.editData.studentCity
      );
      this.studentForm.controls['studentDOB'].setValue(
        this.editData.studentDOB
      );
      this.studentForm.controls['studentCourse'].setValue(
        this.editData.studentCourse
      );
      this.setAction = 'Modifica';
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      panelClass: ['mat-toolbar', 'mat-primary'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2500,
    });
  }

  addStudent(): void {
    if (!this.editData) {
      if (this.studentForm.valid) {
        this.http.addStudent(this.studentForm.value).subscribe({
          next: (res) => {
            this.openSnackBar('Studente aggiunto', 'Chiudi');
            this.studentForm.reset();
            this.dialogRef.close();
          },
        });
      }
    } else {
      this.updateStudent();
    }
  }

  updateStudent() {
    this.http.putStudent(this.studentForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.openSnackBar('Studente modificato con successo', 'Chiudi');
        this.studentForm.reset();
        this.dialogRef.close();
      },
    });
  }
}
