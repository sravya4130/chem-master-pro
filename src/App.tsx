import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
