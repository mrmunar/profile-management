import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddUserButtonComponent } from './components/add-user-button/add-user-button.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { FilterToogleComponent } from './components/filter-toogle/filter-toogle.component';
import { ProfileManagementService } from './services/profile-management.service';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AddUserButtonComponent,
    UserListComponent,
    UserDetailsComponent,
    FilterToogleComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OrderModule
  ],
  providers: [ProfileManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
