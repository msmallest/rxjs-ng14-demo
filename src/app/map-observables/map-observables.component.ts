import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable, map, mergeMap, of, toArray } from "rxjs";
import { ImperativeWrapperComponent } from "../shared/imperative-wrapper/imperative-wrapper.component";
import { DeclarativeWrapperComponent } from "../shared/declarative-wrapper/declarative-wrapper.component";

class Person {
  firstName: string;
  lastName: string;
}

@Component({
  selector: "app-map-observables",
  standalone: true,
  template: `
    <h1>Mapping Observables</h1>

    <section id="mapping-array">
      <h2>Array destructuring</h2>

      <app-imperative-wrapper>
        <h3>For loop that gets the unmapped first and last name</h3>
        <ng-container *ngFor="let person of people$ | async">
          <p>{{ person.firstName }} {{ person.lastName }}</p>
        </ng-container>
      </app-imperative-wrapper>

      <app-declarative-wrapper>
        <h3>For loop with mapped full name</h3>
        <ng-container *ngFor="let person of peopleWithFullName$ | async">
          <p>{{ person.fullName }}</p>
        </ng-container>
      </app-declarative-wrapper>
    </section>

    <section id="mapping-object">
      <h2>Single object into multiple sub properties</h2>

      <app-imperative-wrapper>
          <h3>Imperative</h3>
          <p>{{ isInstall }}</p>
          <p>{{ callback }}</p>
      </app-imperative-wrapper>

      <app-declarative-wrapper>
          <h3>Declarative</h3>
          <p>{{ (paramValues$ | async)?.isInstall }}</p>
          <p>{{ (paramValues$ | async)?.callback }}</p>
      </app-declarative-wrapper>
    </section>
  `,
  styleUrls: ["./map-observables.component.scss"],
  imports: [
    CommonModule,
    ImperativeWrapperComponent,
    DeclarativeWrapperComponent,
  ],
})
export class MapObservablesComponent implements OnInit {
  // Array
  people$: Observable<Person[]> = of([
    { firstName: "Brian", lastName: "Troncone" },
    { firstName: "Todd", lastName: "Motto" },
  ]);

  peopleWithFullName$ = this.people$.pipe(
    mergeMap((persons) => persons),
    map((person) => {
      return {
        firstName: person.firstName,
        lastName: person.lastName,
        fullName: `${person.firstName} ${person.lastName}`,
      };
    }),
    toArray()
  );

  // Single into multiple sub properties

  params$ = of({ callback: "callback" });
  isInstall: boolean;
  callback: string;

  paramValues$: Observable<{
    isInstall: boolean;
    callback: string;
  }> = this.params$.pipe(
    map((params) => ({
      isInstall: !!params.callback,
      callback: params.callback,
    }))
  );

  ngOnInit() {
    this.people$.subscribe(console.log);
    this.peopleWithFullName$.subscribe(console.log);

    this.params$.subscribe((params) => {
      this.isInstall = !!params.callback;
      this.callback = params.callback;
    });
  }
}
