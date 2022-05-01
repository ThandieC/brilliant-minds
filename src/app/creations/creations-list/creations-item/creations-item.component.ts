import { Component, OnInit, Input } from '@angular/core';
import { StoryModel } from '../../../shared/story.model';

@Component({
  selector: 'app-creations-item',
  templateUrl: './creations-item.component.html',
  styleUrls: ['./creations-item.component.css']
})
export class CreationsItemComponent implements OnInit {
  @Input() creations: StoryModel;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
