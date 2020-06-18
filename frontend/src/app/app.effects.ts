import { Effect, ofType, Actions } from '@ngrx/effects';
import * as ProjectActions from './store/actions/project.actions';
import {
  map,
  concatMap
} from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ComponenetsEffects {

  constructor(
    private readonly actions$: Actions
  ) {}

  @Effect()
  public createNewTask$ = this.actions$.pipe(
    ofType(ProjectActions.ProjectActionTypes.CREATE_TASK),
    map(action => new ProjectActions.EditTask(-1))

  )
}
