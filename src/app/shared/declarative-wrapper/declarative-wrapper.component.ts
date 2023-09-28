import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-declarative-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="declarative-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
    .declarative-wrapper {
      border-left: 0.5rem solid green;
      padding-left: 2rem;
    }
    `
  ]
})
export class DeclarativeWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
