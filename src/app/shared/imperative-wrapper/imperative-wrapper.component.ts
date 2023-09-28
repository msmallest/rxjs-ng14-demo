import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-imperative-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="imperative-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `.imperative-wrapper {
        border-left: 0.5rem solid orange;
        padding-left: 2rem;
    }`
  ]
})
export class ImperativeWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
