import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreationsRouterModule } from './creations.router.module';
import { SharedModule } from '../shared/shared.module';
import { CreationsComponent } from './creations.component';
import { CreationsListComponent } from './creations-list/creations-list.component';
import { CreationsItemComponent } from './creations-list/creations-item/creations-item.component';
import { CreationsPageComponent } from './creations-page/creations-page.component';
import { CreationsHomeComponent } from './creations-home/creations-home.component';
import { CreationsEditComponent } from './creations-edit/creations-edit.component';

@NgModule({
  declarations: [
    CreationsComponent,
    CreationsListComponent,
    CreationsItemComponent,
    CreationsPageComponent,
    CreationsHomeComponent,
    CreationsEditComponent,
  ],
  imports: [
    CreationsRouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreationsRouterModule,
    CreationsComponent,
    CreationsListComponent,
    CreationsItemComponent,
    CreationsPageComponent,
    CreationsHomeComponent,
    CreationsEditComponent,
  ],
})
export class CreationsModule {}
