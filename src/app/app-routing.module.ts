import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AutosComponent} from './autos/autos.component';
import {PeopleComponent} from './people/people.component';
import {AutoCreateComponent} from './auto-create/auto-create.component';

const routes: Routes = [
    {path: '', redirectTo: 'auto', pathMatch: 'full'},
    {
        path: 'auto', component: HomeComponent,
        children: [
            {path: '', component: AutosComponent},
            {path: ':id', component: AutoCreateComponent},
        ]
    },
    {
        path: 'people', component: HomeComponent,
        children: [{path: '', component: PeopleComponent}]
    },
    {
        path: 'create', component: HomeComponent,
        children: [{path: '', component: AutoCreateComponent}]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
