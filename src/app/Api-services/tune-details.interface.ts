export interface TuneDetails {
  id: number;
  name: string;
  url: string;
  member: {
    id: number;
    name: string;
    url: string;
  };
  date: string;
  type: string;
  tunebooks: number;
  recordings: number;
  collections: number;
  aliases: string[];
  settings: {
    id: number;
    url: string;
    key: string;
    abc: string;
    member: {
      id: number;
      name: string;
      url: string;
    };
    date: string;
  }[];
}
