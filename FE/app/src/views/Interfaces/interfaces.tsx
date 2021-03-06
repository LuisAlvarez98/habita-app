export interface Habit {
  title: string;
  description: string;
  duration?: string;
  coins: number;
  _id: string;
  fequencyDescription: string;
  status: string;
  taskType: string;
  frequency: string[];
  startDate: Date;
  endDate: Date;
}

export interface Quest {
  title: string;
  description: string;
  duration?: string;
  coins: number;
  _id: string;
  status: string;
}

export interface User {
  coins: number;
  experience: number;
  fullName: string;
  hitpoints: number;
  level: number;
  completedHabits?: [Habit];
  completedQuests?: [Quest];
}
