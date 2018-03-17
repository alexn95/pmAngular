import { Project } from './../models/project';
import { Injectable, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class SerachTasksService {

  constructor() { }

  @Output() refreshEmmiter: EventEmitter<any> = new EventEmitter();
  
  public refresh(){
    this.refreshEmmiter.emit(null)
  }

  

}