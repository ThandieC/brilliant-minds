import { SafeUrl } from '@angular/platform-browser';
import { ParagraphsModel } from './paragraphs.model';

export class StoryModel {
  public title?: string;
  public description?: string;
  public imageURL?: string;
  public imageAlt?: string;
  public storyBody?: ParagraphsModel;
  public creationBody?: string;
  public questions?: string[];
  public answers?: string[];

  constructor(
    title: string,
    description: string,
    imageURL: string,
    imageAlt: string,
    body: ParagraphsModel,
    creation: string,
    qsn: string[],
    ans: string[]
  ) {
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
    this.imageAlt = imageAlt;
    this.storyBody = body;
    this.creationBody = creation;
    this.questions = qsn;
    this.answers = ans;
  }
}
