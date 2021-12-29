import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataComponent } from './data/data.component';
import { ResourcesComponent } from './resources/resources.component';


const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "data", component: DataComponent },
  {path: "resources", component:ResourcesComponent},
  {path:'**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
