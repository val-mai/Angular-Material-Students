import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog-add/dialog/dialog.component';
import { HttpService } from 'src/app/services/http.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {IStudent} from 'src/app/interfaces/istudent';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

  displayedColumns: string[] = ['id', 'studentName', 'studentLast', 'studentMail','studentCity' , 'studentCourse', 'actions'];
  dataSource!: MatTableDataSource<IStudent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private http:HttpService, private snackbar: MatSnackBar,) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      panelClass: ['mat-toolbar', 'mat-primary'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2500,
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%',
    }).afterClosed().subscribe(val =>{
      this.getAllStudents();
    });
  }

  getAllStudents() {
    this.http.getStudent()
    .subscribe({
      next: (student) => {
        this.dataSource = new MatTableDataSource(student);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  editStudent(student: IStudent) {
    this.dialog.open(DialogComponent,{
      width: '40%',
      data:student
    }).afterClosed().subscribe(val => {
      this.getAllStudents();
    })
  }

  deleteStudent(id:number){
    this.http.deleteStudent(id)
    .subscribe({
      next: (res) => {
        this.openSnackBar('Studente rimosso con successo', 'Chiudi');
        this.getAllStudents();
      }
    })
  }
}
