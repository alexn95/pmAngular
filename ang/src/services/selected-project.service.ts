import { Injectable, EventEmitter, Output } from '@angular/core';
import { Project } from '../models/project';

@Injectable()
export class SelectedProjectsService {

  @Output() projectEmmiter: EventEmitter<Project> = new EventEmitter();

  constructor(
  ) { }

  public selectProject(project: Project){
    this.projectEmmiter.emit(project);
  }

}
