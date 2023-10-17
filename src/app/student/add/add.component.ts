import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators}  from '@angular/forms' 
import { StuService } from '../stu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  submited:boolean=false
URL:any="";
studentArray:any=[]
 defaultImga="../../../assets/student-logo-vector.jpg"

 branch =["CSE", "ME", "EL", "IT", "CE"]
 year= ['1st', "2nd" , "3rd" , "4th"]
 id:any
 student!:FormGroup
 constructor(private _fb:FormBuilder, private ser:StuService, private router:Router, private activatedRouter:ActivatedRoute){
 
  this.id= this.activatedRouter.snapshot.paramMap.get("id")
 
 }

  selectProfile( event:any){
if(event.target.files && event.target.files[0]){

  var filereader = new FileReader();
  filereader.readAsDataURL(event.target.files[0])
  filereader.onload= (event)=>{
 this.URL=event.target?.result;
  this.student.get("image")?.patchValue(this.URL)

  }

}

   

  }

  ngOnInit(): void {
    this.student = this._fb.group({
      id:new FormControl(1,),
      image: new FormControl("", [ Validators.required]),
      firstName: new FormControl('', [ Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required,Validators.email]),
      branchName: new FormControl("", [Validators.required]),
      year: new FormControl("", [Validators.required])


    })
    
   const local = localStorage.getItem("studentList");
   if(local !== null){
  this.studentArray =JSON.parse(local);

   const data = this.studentArray.find((st:any)=>st.id ==this.id)

  this.student.patchValue(data);
this.URL=data.image

   }
  }


  get alert(){
    return this.student.controls
  }

  add(){
  
    if(this.student.invalid){
      this.submited=true
      return 
    }
    const local  = localStorage.getItem("studentList")
    if(local  == null){
      this.studentArray.push(this.student.value)
      localStorage.setItem("studentList", JSON.stringify(this.studentArray))
    }
    else{
      const parsdata =JSON.parse(local);
      this.student.get("id")?.patchValue (this.studentArray.length + 1)
      this.studentArray.push(this.student.value)
      localStorage.setItem("studentList", JSON.stringify(this.studentArray))
    }
    this.router.navigate(['/student'])
    Swal.fire(
      'Welcome!',
      'New Student Added!',
      'success'
    )

      }



      onUpdate(){
        if(this.student.invalid){
          this.submited=true
          return 
        }

        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          
          if (result.isConfirmed) {
            const index = this.studentArray.findIndex((x:any)=>x.id ==this.id);

            if(index != -1){
              this.studentArray[index].firstName=this.student.get("firstName")?.value
              this.studentArray[index].image=this.student.get("image")?.value
              this.studentArray[index].lastName=this.student.get("lastName")?.value
              this.studentArray[index].email=this.student.get("email")?.value
              this.studentArray[index].branchName=this.student.get("branchName")?.value
              this.studentArray[index].year=this.student.get("year")?.value
              localStorage.setItem("studentList", JSON.stringify(this.studentArray));
              this.router.navigate(['/student'])
            }
          
            Swal.fire('Saved!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })


    
      }


}
 