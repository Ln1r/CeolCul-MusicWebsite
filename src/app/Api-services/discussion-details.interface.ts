export interface DiscussionDetails {
    discussions: {
      id: number;
      name: string;
      url: string;
      member: {
        id: number;
        name: string;
        url: string;
      };
      date: string;
      comments: number;
    }[];
}

export interface CommentDetails {
    id: number;
    name: string;
    url: string;
    member: {
        id: number;
        name: string;
        url: string;
    };
    date: string;
    comments: { 
        id: number;
        url: string;
        subject: string;
        content: string;
        member: {
            id: number;
            name: string;
            url: string;
        };
        date: string;
    }[];
}