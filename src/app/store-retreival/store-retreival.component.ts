import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Select } from "@ngxs/store";
import { ApplState, Thing } from "../ngxs/app.state";
import { Observable } from "rxjs";
import { DeclarativeWrapperComponent } from "../shared/declarative-wrapper/declarative-wrapper.component";
import { ImperativeWrapperComponent } from "../shared/imperative-wrapper/imperative-wrapper.component";

@Component({
  selector: "app-store-retreival",
  standalone: true,
  template: `
    <h1>Store Retreival</h1>

    <section>
      <app-imperative-wrapper>
        <p>Imperatively set in init from a subscription to a store selector</p>
        <p> {{ thing }}</p>
      </app-imperative-wrapper>

      <app-declarative-wrapper
        ><p>
          Async pipe
        </p>
        <p>{{ (thing$ | async)?.stuff }}</p>
        
        <ng-container *ngIf="thing$ | async as thing">
          <p>Async pipe, but the async pipe is aliased in an outer wrapper so it can be easily refered to without doing the pipe each time</p>
          <p>{{thing.stuff}}</p>
        </ng-container>
        </app-declarative-wrapper
      >
    </section>
  `,
  styleUrls: ["./store-retreival.component.scss"],
  imports: [
    CommonModule,
    DeclarativeWrapperComponent,
    ImperativeWrapperComponent,
  ],
})
export class StoreRetreivalComponent implements OnInit {
  thing: string;

  @Select(ApplState.thing)
  thing$: Observable<Thing>;

  constructor() {}

  ngOnInit(): void {
    this.thing$.subscribe((thing) => (this.thing = thing.stuff));
  }
}
