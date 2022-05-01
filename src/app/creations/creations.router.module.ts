import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationsPageComponent } from './creations-page/creations-page.component';
import { CreationsHomeComponent } from './creations-home/creations-home.component';
import { CreationsComponent } from './creations.component';
import { CreationsEditComponent } from './creations-edit/creations-edit.component';

const creationsRoutes: Routes = [
 {
    path: '', component: CreationsComponent, children: [
     { path: '', component: CreationsHomeComponent },
     { path: 'new', component: CreationsEditComponent },
     { path: ':id', component: CreationsPageComponent },
     { path: ':id/edit', component: CreationsEditComponent },
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(creationsRoutes)
  ],
  exports: [RouterModule]
})
export class CreationsRouterModule { }
