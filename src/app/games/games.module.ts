import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GamesRouterModule } from './games-router.module';
import { AdditionComponent } from './addition/addition.component';
import { PyramidComponent } from './pyramid/pyramid.component';
import { MemoryComponent } from './memory/memory.component';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [
    AdditionComponent,
    PyramidComponent,
    MemoryComponent,
    QuizComponent,
  ],
  imports: [GamesRouterModule, CommonModule, FormsModule],
  exports: [CommonModule, FormsModule, GamesRouterModule],
})
export class GamesModule {}
