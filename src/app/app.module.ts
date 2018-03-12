import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AddUserButtonComponent } from './components/add-user-button/add-user-button.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { FilterToogleComponent } from './components/filter-toogle/filter-toogle.component';


@NgModule({
  declarations: [
    AppComponent,
    AddUserButtonComponent,
    UserListComponent,
    UserDetailsComponent,
    FilterToogleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
