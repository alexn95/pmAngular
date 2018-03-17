import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

  @Input()
  public project: Project;

  constructor() { }

  ngOnInit() {
  }
  

}
