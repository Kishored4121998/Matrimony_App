import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailySuggestionsComponent } from './daily-suggestions/daily-suggestions.component';
import { ProfileDetailComponent } from './Profile-detail/profile-detail/profile-detail.component';
import { ProfileListComponent } from './Profile-list/profile-list/profile-list.component';

const routes: Routes = [
  { path: '', component: ProfileListComponent }, // Profile list as home
  { path: 'detail/:id', component: ProfileDetailComponent },
  { path: 'daily-suggestions', component: DailySuggestionsComponent },
  { path: '', redirectTo: '/daily-suggestions', pathMatch: 'full' } // Profile detail route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
