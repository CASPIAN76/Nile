import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StuService {

  private localData="student"


  constructor() { }

  addStudent(student:any){
localStorage.setItem(this.localData,JSON.stringify(student))
  }
}
