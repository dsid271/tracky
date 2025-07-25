
import JourneyDashboard from '@/components/journey/JourneyDashboard';
import { Suspense } from 'react';

function DashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <JourneyDashboard />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading Dashboard...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
