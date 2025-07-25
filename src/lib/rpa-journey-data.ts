import type { Task, LeaderboardEntry } from '@/types';

export const initialTasks: Task[] = [
  // Week 1
  { id: 1, day: 1, week: 1, title: "What is RPA? Why is it used? Watch intro video. Read about UiPath, Automation Anywhere, Blue Prism.", status: "Not Started", notes: "" },
  { id: 2, day: 2, week: 1, title: "Attended vs unattended automation. RPA lifecycle & key components. Write 3 real-life use cases.", status: "Not Started", notes: "" },
  { id: 3, day: 3, week: 1, title: "Install UiPath, explore Studio interface. Learn sequences & workflows.", status: "Not Started", notes: "" },
  { id: 4, day: 4, week: 1, title: "Learn variables, data types, arguments. Practice message box workflow.", status: "Not Started", notes: "" },
  { id: 5, day: 5, week: 1, title: "Control flow (If, While, For Each). Create workflow reading user input.", status: "Not Started", notes: "" },
  { id: 6, day: 6, week: 1, title: "Learn selectors & UI elements. Automate Notepad typing task.", status: "Not Started", notes: "" },
  { id: 7, day: 7, week: 1, title: "Mini-project: Automate login to demo website & extract data.", status: "Not Started", notes: "" },

  // Week 2
  { id: 8, day: 8, week: 2, title: "Recording in UiPath (Basic, Desktop, Web). Practice web automation.", status: "Not Started", notes: "" },
  { id: 9, day: 9, week: 2, title: "Read/write Excel files. Display Excel data.", status: "Not Started", notes: "" },
  { id: 10, day: 10, week: 2, title: "Data scraping from websites.", status: "Not Started", notes: "" },
  { id: 11, day: 11, week: 2, title: "Email automation (send, read, attachments).", status: "Not Started", notes: "" },
  { id: 12, day: 12, week: 2, title: "Error handling & try-catch. Apply to workflow.", status: "Not Started", notes: "" },
  { id: 13, day: 13, week: 2, title: "Orchestrator basics & publishing bots.", status: "Not Started", notes: "" },
  { id: 14, day: 14, week: 2, title: "Mini-project: Extract data from site -> write to Excel.", status: "Not Started", notes: "" },

  // Week 3
  { id: 15, day: 15, week: 3, title: "Intro to REFramework, queues & transactions.", status: "Not Started", notes: "" },
  { id: 16, day: 16, week: 3, title: "Advanced & dynamic selectors.", status: "Not Started", notes: "" },
  { id: 17, day: 17, week: 3, title: "Credential management & secure automation.", status: "Not Started", notes: "" },
  { id: 18, day: 18, week: 3, title: "API integration with UiPath (REST/SOAP).", status: "Not Started", notes: "" },
  { id: 19, day: 19, week: 3, title: "Attended vs unattended robots, scheduling bots.", status: "Not Started", notes: "" },
  { id: 20, day: 20, week: 3, title: "Logging, monitoring & analytics.", status: "Not Started", notes: "" },
  { id: 21, day: 21, week: 3, title: "Mini-project: Multi-step business automation (invoice extraction -> Excel -> email).", status: "Not Started", notes: "" },

  // Week 4
  { id: 22, day: 22, week: 4, title: "Choose final project idea, design workflow.", status: "Not Started", notes: "" },
  { id: 23, day: 23, week: 4, title: "Implement project with error handling & reusable workflows.", status: "Not Started", notes: "" },
  { id: 24, day: 24, week: 4, title: "Implement project with error handling & reusable workflows.", status: "Not Started", notes: "" },
  { id: 25, day: 25, week: 4, title: "Implement project with error handling & reusable workflows.", status: "Not Started", notes: "" },
  { id: 26, day: 26, week: 4, title: "Implement project with error handling & reusable workflows.", status: "Not Started", notes: "" },
  { id: 27, day: 27, week: 4, title: "Test & debug bot. Document process.", status: "Not Started", notes: "" },
  { id: 28, day: 28, week: 4, title: "RPA best practices (scalability, maintainability).", status: "Not Started", notes: "" },
  { id: 29, day: 29, week: 4, title: "Prepare for RPA interview & certification basics.", status: "Not Started", notes: "" },
  { id: 30, day: 30, week: 4, title: "Final Project: Present bot, reflect on learning.", status: "Not Started", notes: "" },
];

export const leaderboardUsers: LeaderboardEntry[] = [
    { id: 'nandan', name: 'Nandan', avatarUrl: 'https://placehold.co/40x40.png' },
    { id: 'sid', name: 'Sid', avatarUrl: 'https://placehold.co/40x40.png' },
];
