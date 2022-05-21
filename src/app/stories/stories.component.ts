import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
})
export class StoriesComponent implements OnInit {
  book: boolean = false;
  storylist: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onToggleStoryList() {
    this.storylist = !this.storylist;
  }

  onCloseStoryList() {
    this.storylist = false;
    this.onSelectStory();
  }

  onSelectStory() {
    this.book = true;
  }

  onShowStoryList() {
    this.book = false;
  }
}
