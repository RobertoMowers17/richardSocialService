export interface Event {
    id: number;
    title: string;
    date: Date;
    startHour: string;
    endHour: string;
    projectId: number;
    projectName: string;
    properties: { id: number; name: string; description: string; }[];
  }
  