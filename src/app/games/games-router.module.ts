import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionComponent } from './addition/addition.component';
import { QuizComponent } from './quiz/quiz.component';
import { PyramidComponent } from './pyramid/pyramid.component';
import { MemoryComponent } from './memory/memory.component';

const gamesRoutes: Routes = [
  { path: 'addbox', component: AdditionComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'pyramid', component: PyramidComponent },
  { path: 'memory', component: MemoryComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(gamesRoutes)],
  exports: [RouterModule],
})
export class GamesRouterModule {}
