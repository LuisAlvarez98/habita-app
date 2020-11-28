export interface Habit {
  title: string;
  description: string;
  duration?: string;
  coins: number;
  _id: string;
  fequencyDescription: string;
}

export interface Quest {
  title: string;
  description: string;
  duration?: string;
  coins: number;
  _id: string;
}

export interface User {
  coins: number;
  experience: number;
  fullName: string;
  hitpoints: number;
  level: number;
}
