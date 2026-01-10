import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Index from "./pages/Index";
import SelectSubject from "./pages/SelectSubject";
import SelectTutor from "./pages/SelectTutor";
import Topics from "./pages/Topics";
import Tutors from "./pages/Tutors";
import Friends from "./pages/Friends";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Learn from "./pages/Learn";
import GameIUPAC from "./pages/GameIUPAC";
import GameSigmaPi from "./pages/GameSigmaPi";
import GameHybridisation from "./pages/GameHybridisation";
import Achievements from "./pages/Achievements";
import SignUp from "./pages/SignUp";
import Pricing from "./pages/Pricing";
import TopicsMaths from "./pages/TopicsMaths";
import TopicsPhysics from "./pages/TopicsPhysics";
import LearnMaths from "./pages/LearnMaths";
import LearnPhysics from "./pages/LearnPhysics";
import GameMaths from "./pages/GameMaths";
import GamePhysics from "./pages/GamePhysics";

export type SigmaPiQuestion = {
  id: number;
  structure: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  hints: string[];
};

export const sigmaPiQuestions: SigmaPiQuestion[] = [
  {
    id: 1,
    structure: 'Single bond between two carbons',
    name: '1 sigma bond',
    difficulty: 'easy',
    xpReward: 10,
    hints: ['Single bonds are sigma bonds']
  },
  {
    id: 2,
    structure: 'Double bond between two carbons',
    name: '1 sigma bond and 1 pi bond',
    difficulty: 'easy',
    xpReward: 15,
    hints: ['Double bond = sigma + pi']
  },
  {
    id: 3,
    structure: 'Triple bond between two carbons',
    name: '1 sigma bond and 2 pi bonds',
    difficulty: 'medium',
    xpReward: 20,
    hints: ['Triple bond has one sigma']
  }
];


const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      {/* Force Home to always load fresh */}
      <Route path="/" element={<Index key={location.key} />} />

      <Route path="/select-subject" element={<SelectSubject />} />
      <Route path="/select-tutor" element={<SelectTutor />} />
      <Route path="/topics" element={<Topics />} />
      <Route path="/tutors" element={<Tutors />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/about" element={<About />} />
      <Route path="/learn/:topicId" element={<Learn />} />
      <Route path="/game/iupac" element={<GameIUPAC />} />
      <Route path="/game/sigma-pi" element={<GameSigmaPi />} />
      <Route path="/game/hybridisation" element={<GameHybridisation />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/topics/maths" element={<TopicsMaths />} />
      <Route path="/topics/physics" element={<TopicsPhysics />} />
      <Route path="/learn/maths/:topicId" element={<LearnMaths />} />
      <Route path="/learn/physics/:topicId" element={<LearnPhysics />} />
      <Route path="/game/maths/:topicId" element={<GameMaths />} />
      <Route path="/game/physics/:topicId" element={<GamePhysics />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
