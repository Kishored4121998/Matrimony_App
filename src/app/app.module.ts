import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HammerModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import {  ProfileListComponent  } from './Profile-list/profile-list/profile-list.component';
import { ProfileCardComponent } from './Profile-card/profile-card/profile-card.component'
import { ProfileService } from './services/profile.service';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './Profile-detail/profile-detail/profile-detail.component';

import { DailySuggestionsComponent } from './daily-suggestions/daily-suggestions.component';




@NgModule({ declarations: [
        AppComponent,
        ProfileCardComponent,
        ProfileListComponent,
        ProfileDetailComponent,
        DailySuggestionsComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        HammerModule,
        AppRoutingModule,
        MatIconModule,
        CommonModule], providers: [
        ProfileService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
function provideAnimationsAsync(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

