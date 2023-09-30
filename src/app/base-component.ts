import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, map, mergeMap, of } from 'rxjs';
import { ApplState, UpdateThing, UpdateThose } from './ngxs/app.state';

@Component({
  selector: 'base-component',
  templateUrl: 'base-component.html',
})
export class BaseComponent {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new UpdateThing({stuff: 'string'}))
    this.store.dispatch(new UpdateThose(['string']))

    console.log(this.store.selectSnapshot(ApplState.thing))
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
