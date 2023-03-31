export class Tune {
  id: number;
  name: string;
  instrument: string;
  settings: TuneSettings[];

  constructor(name: string, instrument: string, id: number, settings: TuneSettings[]) {
    this.id = id;
    this.name = name;
    this.instrument = instrument;
    this.settings = settings;
  }
}
export interface TuneSettings {
  id: number;
  name: string;
  type: string;
  key: string;
  url: string;
  abc: string;
  member: {
    id: number; 
    name: string;
    url: string; }; 
  date: string;
}

export class Discussion {
  id?: number;
  title: string;
  description: string;
  comments: Comment[]; // define the comments property as an array of Comment objects
  showComments: boolean; // Add this line
  timestamp: Date;
  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.comments = []; // initialize the comments array to an empty array
    this.showComments = false;
    this.timestamp = new Date();
  }
}
export interface Comment {
  id?: number; // optional id property, depending on your backend implementation
  text: string;
  userId?: number; // optional user ID property, if you want to associate comments with users
  timestamp?: Date; // optional timestamp property, if you want to track when comments were posted
}
