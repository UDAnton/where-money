import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import {RouterModule, Routes} from '@angular/router';
import {UsersService} from './shared/services/users.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './shared/services/auth.service';
import {SystemModule} from './system/system.module';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AuthModule, HttpClientModule, RouterModule.forRoot(routes), SystemModule
  ],
  providers: [UsersService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
