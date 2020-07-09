import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProjectReducer } from './store/reducers/project.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ComponenetsEffects } from './app.effects';

import { HttpClientModule } from '@angular/common/http';
import { TaskCardComponent } from './modules/tasks/task-card/task-card.component';
import { TaskListComponent } from './modules/tasks/task-list/task-list.component';
import { GraphBlockComponent } from './modules/graphs/graph-block/graph-block.component';
import { TaskCreateComponent } from './modules/tasks/task-create/task-create.component';
import { ProjectCreateComponent } from './modules/project/project-create/project-create.component';
import { MenuBarComponent } from './modules/menu/menu-bar/menu-bar.component';
import { MenuPadComponent } from './modules/menu/menu-pad/menu-pad.component';
import { PopupWindowComponent } from './modules/menu/popups/popup-window/popup-window.component';
import { PopupManagerComponent } from './modules/menu/popups/popup-manager/popup-manager.component';
import { DropDownComponent } from './components/buttons/drop-down/drop-down.component';
import { DatetimeInputComponent } from './components/inputs/datetime-input/datetime-input.component';
import { AuthFormComponent } from './modules/auth/auth-form/auth/auth-form/auth-form.component';
import { ProjectContainerComponent } from './modules/project/project-container/project-container.component';

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
    AuthFormComponent,
    ProjectContainerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      project: ProjectReducer,
    }),
    EffectsModule.forRoot([ComponenetsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
