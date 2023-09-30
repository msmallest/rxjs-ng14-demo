import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export class UpdateThing {
    static readonly type = '[App] UpdateThing';
    constructor(public thing: Thing) {}
}
export class UpdateThose {
    static readonly type = '[App] UpdateThose';
    constructor(public those: string[]) {}
}

export class Thing {
    stuff: string;
}
export class StateModel {
    thing: Thing;
    those: string[];
}

const DEFAULT_STATE = {
    thing: new Thing(),
    those: [],
};

@State<StateModel>({
    name: 'appName',
    defaults: DEFAULT_STATE
})
@Injectable()
export class ApplState {
    public static defaultState = DEFAULT_STATE;

    @Selector()
    static thing(state: StateModel) {
        return state.thing;
    }    
    
    @Selector()
    static those(state: StateModel) {
        return state.those;
    }

    @Action(UpdateThing)
    updateThing(
        { patchState }: StateContext<StateModel>,
        { thing }: UpdateThing
    ) {
        patchState({ thing: thing });
    }   
    
    @Action(UpdateThose)
    updateThose(
        { patchState }: StateContext<StateModel>,
        { those }: UpdateThose
    ) {
        patchState({ those: those });
    }
}
