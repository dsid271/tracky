import { Rocket } from 'lucide-react';

export default function JourneyHeader() {
  return (
    <header className="text-center space-y-2">
      <div className="flex items-center justify-center gap-4">
        <Rocket className="h-10 w-10 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
          JourneyBoard
        </h1>
      </div>
      <p className="text-lg md:text-xl text-muted-foreground">
        Our 30-Day RPA Learning Journey Tracker
      </p>
    </header>
  );
}
