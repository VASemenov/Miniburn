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
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { MenuBarComponent } from './menu/menu-bar/menu-bar.component';
import { MenuPadComponent } from './menu/menu-pad/menu-pad.component';
import { PopupWindowComponent } from './popups/popup-window/popup-window.component';
import { PopupManagerComponent } from './popups/popup-manager/popup-manager.component';
import { DropDownComponent } from './buttons/drop-down/drop-down.component';
import { DatetimeInputComponent } from './inputs/datetime-input/datetime-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskCardComponent,
    TaskListComponent,
    GraphBlockComponent,
    TaskCreateComponent,
    ProjectCreateComponent,
    MenuBarComponent,
    MenuPadComponent,
    PopupWindowComponent,
    PopupManagerComponent,
    DropDownComponent,
    DatetimeInputComponent,
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
