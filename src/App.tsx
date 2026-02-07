import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DayHub from "./pages/DayHub";
import Day1Rose from "./pages/days/Day1Rose";
import Day2Propose from "./pages/days/Day2Propose";
import Day3Chocolate from "./pages/days/Day3Chocolate";
import Day4Teddy from "./pages/days/Day4Teddy";
import Day5Promise from "./pages/days/Day5Promise";
import Day6Hug from "./pages/days/Day6Hug";
import Day7Kiss from "./pages/days/Day7Kiss";
import Day8Valentine from "./pages/days/Day8Valentine";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hub" element={<DayHub />} />
          <Route path="/day/1" element={<Day1Rose />} />
          <Route path="/day/2" element={<Day2Propose />} />
          <Route path="/day/3" element={<Day3Chocolate />} />
          <Route path="/day/4" element={<Day4Teddy />} />
          <Route path="/day/5" element={<Day5Promise />} />
          <Route path="/day/6" element={<Day6Hug />} />
          <Route path="/day/7" element={<Day7Kiss />} />
          <Route path="/day/8" element={<Day8Valentine />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
