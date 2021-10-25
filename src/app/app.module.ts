//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material-module';
import { AngularFireModule } from '@angular/fire';

//Routing
import { AppRoutingModule } from './app-routing/app-routing.module';

//Components
import { AppComponent } from './app.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { AddTaskComponent } from './components/dialogs/add-task/add-task.component';
import { AddTodoComponent } from './components/dialogs/add-todo/add-todo.component';
import { EditTodoComponent } from './components/dialogs/edit-todo/edit-todo.component';
import { DeleteTodoComponent } from './components/dialogs/delete-todo/delete-todo.component';
import { EditTaskComponent } from './components/dialogs/edit-task/edit-task.component';
import { DeleteTaskComponent } from './components/dialogs/delete-task/delete-task.component';

//Services
import { LocalStorageService } from './services/local.storage.service';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    AddTaskComponent,
    AddTodoComponent,
    EditTodoComponent,
    DeleteTodoComponent,
    EditTaskComponent,
    DeleteTaskComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LayoutModule,
    MaterialModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyC58MiPnKFTISC2LB3acYkcXaSR4bmTAgs',
      authDomain: 'to-do-list-45d2e.firebaseapp.com',
      projectId: 'to-do-list-45d2e',
      storageBucket: 'to-do-list-45d2e.appspot.com',
      messagingSenderId: '932425395208',
      appId: '1:932425395208:web:bc070a22e2b224ca5df5bd',
      measurementId: 'G-HERRTMGPQR',
    }),
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
