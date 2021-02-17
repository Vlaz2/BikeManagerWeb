import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeListComponent } from './components/bike-list/bike-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/bike-list', pathMatch: 'full' },
  { path: 'bike-list', component: BikeListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
