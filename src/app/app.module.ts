import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskCardComponent } from './tasks/task-card/task-card.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { GraphBlockComponent } from './graphs/graph-block/graph-block.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import { ProjectReducer } from './store/reducers/project.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ComponenetsEffects } from './app.effects';

@NgModule({
  declarations: [
    AppComponent,
    TaskCardComponent,
    TaskListComponent,
    GraphBlockComponent,
    TaskCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      project: ProjectReducer
    }),
    EffectsModule.forRoot([
      ComponenetsEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
