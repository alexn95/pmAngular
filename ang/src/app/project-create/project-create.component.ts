import { SearchProjectsService } from './../../services/search-projects.service';
import { FormErrorStateMatcher } from './../../models/form-error-state-matcher';
import { AuthService } from './../../services/auth.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectsService } from './../../services/projects.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html'
})
export class ProjectCreateComponent implements OnInit {

  private matcher = new FormErrorStateMatcher();

  private title = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)
  ]);

  private description = new FormControl('', [
    Validators.minLength(3),
    Validators.maxLength(200)
  ]); 

  private projectCreateForm: FormGroup = this.builder.group({
    title: this.title,
    description : this.description,
  });

  constructor(
    private searchProjectsService: SearchProjectsService,
    private projectService: ProjectsService,
    private builder: FormBuilder,
    private router : Router,
    private snackBar : MatSnackBar,
    private auth: AuthService,
    private dialogRef : MatDialogRef<ProjectCreateComponent>,
  ) {
   }

  ngOnInit() { 
  }

  private cancel(){
    this.dialogRef.close()
  }

  private save(){
    console.log('save')
    let projectData = {
      "title" : this.title.value,
      "description" : this.description.value,
    }
    console.log(projectData)
    this.projectService.createProject(projectData).subscribe(res=>{
      console.log(res)
      if (!res){
        this.dialogRef.close()
        this.auth.logout()
        this.snackBar.open("Your user session was not valid.", "close", {
          duration: 3000,
        }); 
        return
      } else if (res['status'] == 0){
        this.snackBar.open("Project with this title already exists.", "close", {
          duration: 3000,
        });
      } else if (res['status'] == 1){
        this.dialogRef.close()
        this.searchProjectsService.refresh()
        this.snackBar.open("Project was created.", "close", {
          duration: 3000,
        });
      }
    })
  }

}
