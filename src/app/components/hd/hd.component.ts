import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hd',
  templateUrl: './hd.component.html',
  styleUrls: ['./hd.component.scss'],
})
export class HdComponent {

  @Input() titulo;
  @Output() clickPost = new EventEmitter();
  @Output() addPost = new EventEmitter();
  @Output() deletePost = new EventEmitter();

  constructor() { }

  onClick() {
    this.clickPost.emit();
  }

  addClick() {
    this.addPost.emit();
  }

  deleteClick() {
    this.deletePost.emit();
  }
}
