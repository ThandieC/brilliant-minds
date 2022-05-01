import { Component, OnInit, Input } from '@angular/core';
import { StoryModel } from '../../../shared/story.model';

@Component({
  selector: 'app-story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.css'],
})
export class StoryItemComponent implements OnInit {
  @Input() story: StoryModel;
  @Input() index: number;

  constructor() {}

  ngOnInit(): void {}
}
