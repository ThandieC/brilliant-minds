import { NgModule } from '@angular/core';
import { StoriesRouterModule } from './stories-router.module';
import { StoriesComponent } from './stories.component';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryItemComponent } from './story-list/story-item/story-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryPageComponent } from './story-page/story-page.component';
import { StoriesHomeComponent } from './stories-home/stories-home.component';


@NgModule({
  declarations: [
    StoriesComponent,
    StoryListComponent,
    StoryItemComponent,
    StoryPageComponent,
    StoriesHomeComponent,
  ],
  imports: [
    StoriesRouterModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    StoriesRouterModule,
    StoriesComponent,
    StoryListComponent,
    StoryPageComponent,
    StoryItemComponent,
    StoriesHomeComponent
  ]

})
export class StoriesModule { }
