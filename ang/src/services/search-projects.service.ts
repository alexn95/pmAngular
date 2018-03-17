import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class SearchProjectsService {

  @Output() refreshEmmiter: EventEmitter<any> = new EventEmitter();

  constructor(
  ) { }

  public refresh(){
    this.refreshEmmiter.emit(null);
  }

}
