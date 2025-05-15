
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VoiceSymptomChecker from "./pages/VoiceSymptomChecker";
import GestureControl from "./pages/GestureControl";
import MedicalChat from "./pages/MedicalChat";
import VideoConsultation from "./pages/VideoConsultation";
import MedicineReminder from "./pages/MedicineReminder";
import HealthFitness from "./pages/HealthFitness";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/voice-symptom-checker" element={<Layout><VoiceSymptomChecker /></Layout>} />
            <Route path="/gesture-control" element={<Layout><GestureControl /></Layout>} />
            <Route path="/medical-chat" element={<Layout><MedicalChat /></Layout>} />
            <Route path="/video-consultation" element={<Layout><VideoConsultation /></Layout>} />
            <Route path="/medicine-reminder" element={<Layout><MedicineReminder /></Layout>} />
            <Route path="/health-fitness" element={<Layout><HealthFitness /></Layout>} />
            <Route path="/auth" element={<Layout><Auth /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
