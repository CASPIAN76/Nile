import { Component,OnInit } from '@angular/core';
import {  } from '@fortawesome/fontawesome-svg-core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements  OnInit{
  studentList:any=[]


  ngOnInit(): void {

const local =localStorage.getItem("studentList");
if(local !==null){
  this.studentList= JSON.parse(local)
 
}
    
  }




  delete(id:any){
   Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.studentList.findIndex((x:any)=> x.id == id)
        console.log(index)
         if(index !== -1){
           this.studentList.splice(index, 1)
           localStorage.setItem("studentList", JSON.stringify(this.studentList));
         }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }

}
