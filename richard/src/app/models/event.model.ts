export interface Event {
    id: number;
    title: string;
    date: Date;
    projectId: number;
    projectName: string;
    properties: { id: number; name: string }[];
  }
  