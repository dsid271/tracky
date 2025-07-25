export type TaskStatus = 'Not Started' | 'In Progress' | 'Done';

export interface Task {
  id: number;
  day: number;
  week: number;
  title: string;
  status: TaskStatus;
  notes: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface UserProgressData {
  tasks: Task[];
}

export interface AllProgress {
  nandan: UserProgressData;
  sid: UserProgressData;
}
