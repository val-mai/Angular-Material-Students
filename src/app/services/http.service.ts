import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudent } from '../interfaces/istudent';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  addStudent(student: IStudent) {
    return this.http.post<IStudent>('http://localhost:3000/students',student);
  }

  getStudent(){
    return this.http.get<any>('http://localhost:3000/students');
  }

  putStudent(student :IStudent, id:number) {
    return this.http.put<IStudent>('http://localhost:3000/students/'+ id,student);
  }

  deleteStudent(id:number) {
    return this.http.delete<any>('http://localhost:3000/students/'+ id);
  }
}
