import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { IStudent } from 'src/app/interfaces/istudent';
import { HttpService } from 'src/app/services/http.service';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private http:HttpClient) { }

  students:IStudent[] = [];

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/students')
    .subscribe(students => {
      this.students = students;
    })
  }

  getFE() {
   return this.students.filter(student => student.studentCourse === "FE").length;
  }

  getFS() {
    return this.students.filter(student => student.studentCourse === "FS").length;
   }

   getBE() {
    return this.students.filter(student => student.studentCourse === "BE").length;
   }

   getCS() {
    return this.students.filter(student => student.studentCourse === "CS").length;
   }
  }
