import { BrowserRouter, Routes, Route } from "react-router-dom";

/* EXISTING PAGES */
import Home from "./pages/Home";
import SelectSubject from "./pages/SelectSubject";
import SelectTutor from "./pages/SelectTutor";
import Topics from "./pages/Topics";

/* FUTURE PAGES */
import Learn from "./pages/Learn";
import Game from "./pages/Game";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* OLD ROUTES – KEEP THEM */}
        <Route path="/" element={<Home />} />
        <Route path="/select-subject" element={<SelectSubject />} />
        <Route path="/select-tutor" element={<SelectTutor />} />
        <Route path="/topics" element={<Topics />} />

        {/* NEW ROUTES – ADDING */}
        <Route path="/learn/:topicId" element={<Learn />} />
        <Route path="/game/:topicId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}
