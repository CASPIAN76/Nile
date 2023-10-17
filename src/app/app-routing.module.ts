import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{path:"",redirectTo:"/student", pathMatch:'full'},
  {path:"student", loadChildren:()=>import("./student/student.module").then(st=>st.StudentModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
