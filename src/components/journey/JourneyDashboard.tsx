"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Task, TaskStatus, AllProgress, UserProgressData } from '@/types';
import { initialTasks, leaderboardUsers } from '@/lib/rpa-journey-data';
import JourneyHeader from './JourneyHeader';
import StatsCards from './StatsCards';
import TaskList from './TaskList';
import Leaderboard from './Leaderboard';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const defaultProgress = (tasks: Task[]): UserProgressData => ({
  tasks: tasks.map(t => ({ ...t, status: 'Not Started', notes: '' })),
});

const initialAllProgress: AllProgress = {
  nandan: defaultProgress(initialTasks),
  sid: defaultProgress(initialTasks),
};

const PROGRESS_DOC_ID = 'user_progress';

function JourneyDashboardContent({ currentUser }: { currentUser: string }) {
  const [allProgress, setAllProgress] = useState<AllProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const docRef = doc(db, 'progress', PROGRESS_DOC_ID);
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setAllProgress(docSnap.data() as AllProgress);
      } else {
        console.log("No such document! Creating initial progress...");
        setDoc(docRef, initialAllProgress).then(() => {
          setAllProgress(initialAllProgress);
          console.log("Initial progress document created.");
        }).catch(error => {
          console.error("Error creating document:", error);
           toast({
            title: "Error",
            description: "Could not create initial progress data.",
            variant: "destructive",
          });
        });
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firebase subscription error:", error);
      toast({
        title: "Firebase Error",
        description: "Could not connect to the database. Please check your connection or Firebase setup.",
        variant: "destructive",
      });
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);
  
  const updateProgress = useCallback(async (user: string, newTasks: Task[]) => {
    if (!allProgress) return;
    
    const updatedProgress: AllProgress = JSON.parse(JSON.stringify(allProgress));
    updatedProgress[user as keyof AllProgress] = { tasks: newTasks };

    // Update state immediately for a responsive UI
    setAllProgress(updatedProgress);
    
    // Then, update Firestore
    try {
      const docRef = doc(db, 'progress', PROGRESS_DOC_ID);
      await setDoc(docRef, updatedProgress);
    } catch (error) {
      console.error("Error updating progress:", error);
       toast({
        title: "Update Failed",
        description: "Your progress could not be saved. Please try again.",
        variant: "destructive",
      });
      // Optionally, revert the state if the update fails
      setAllProgress(allProgress);
    }
  }, [allProgress, toast]);
  
  const handleStatusChange = (taskId: number, status: TaskStatus) => {
    const userTasks = allProgress?.[currentUser as keyof AllProgress]?.tasks;
    if (!userTasks) return;
    const newTasks = userTasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    );
    updateProgress(currentUser, newTasks);
  };

  const handleNotesChange = (taskId: number, notes: string) => {
    const userTasks = allProgress?.[currentUser as keyof AllProgress]?.tasks;
     if (!userTasks) return;
    const newTasks = userTasks.map(task =>
      task.id === taskId ? { ...task, notes } : task
    );
    updateProgress(currentUser, newTasks);
  };
  
  const handleResetProgress = async () => {
    if (window.confirm(`Are you sure you want to reset progress for ${currentUser}? This action cannot be undone.`)) {
        await updateProgress(currentUser, defaultProgress(initialTasks).tasks);
        toast({
          title: "Progress Reset",
          description: `Progress for ${currentUser} has been successfully reset.`,
        });
    }
  };

  const { completedTasks, totalTasks, completionPercentage } = useMemo(() => {
    const userTasks = allProgress?.[currentUser as keyof AllProgress]?.tasks || [];
    const total = userTasks.length;
    if (total === 0) {
      return { completedTasks: 0, totalTasks: 0, completionPercentage: 0 };
    }
    const completed = userTasks.filter(task => task.status === 'Done').length;
    return {
      completedTasks: completed,
      totalTasks: total,
      completionPercentage: Math.round((completed / total) * 100),
    };
  }, [currentUser, allProgress]);

  if (isLoading || !allProgress) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  const currentUserTasks = allProgress[currentUser as keyof AllProgress]?.tasks || [];

  return (
    <div className="container mx-auto p-4 md:p-8 font-body">
      <JourneyHeader />
       <p className="text-center text-lg mt-2">
        Viewing as: <span className="font-bold text-primary">{currentUser}</span>
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <StatsCards tasks={currentUserTasks} completedTasks={completedTasks} totalTasks={totalTasks} completionPercentage={completionPercentage} />
          <TaskList 
            tasks={currentUserTasks} 
            onStatusChange={handleStatusChange} 
            onNotesChange={handleNotesChange} 
            isReadOnly={false}
          />
        </div>
        <div className="space-y-8">
          <Leaderboard allProgress={allProgress} users={leaderboardUsers} currentUser={currentUser} />
          <div className="p-4 flex justify-center">
            <Button variant="outline" onClick={handleResetProgress} disabled={!currentUser}>
              <RotateCcw className="mr-2 h-4 w-4" /> Reset My Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyDashboard() {
  const searchParams = useSearchParams();
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const user = searchParams.get('user');
    if (user && ['nandan', 'sid'].includes(user)) {
      setCurrentUser(user);
    } else {
      setCurrentUser('nandan'); // Default user
    }
  }, [searchParams]);

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading User...</p>
      </div>
    );
  }

  return <JourneyDashboardContent currentUser={currentUser} />;
}


export default function JourneyDashboardWrapper() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <JourneyDashboard />
    </Suspense>
  )
}
