import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoriesComponent } from './stories.component';
import { StoryPageComponent } from './story-page/story-page.component';
import { StoriesHomeComponent } from './stories-home/stories-home.component';

const storiesRoutes: Routes = [
  {
    path: '', component: StoriesComponent, children: [
      { path: '', component: StoriesHomeComponent },
      { path: ':id', component: StoryPageComponent },
  ]},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(storiesRoutes)
  ],
  exports: [RouterModule]
})
export class StoriesRouterModule { }
