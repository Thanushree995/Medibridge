
import { useToast } from "@/components/ui/use-toast";
import { HealthMetrics } from "@/components/HealthMetrics";
import { RecentActivities } from "@/components/RecentActivities";
import { EmergencyCall } from "@/components/EmergencyCall";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, Loader, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { ApiKeySettings } from "@/components/ApiKeySettings";

const Index = () => {
  const { toast: uiToast } = useToast();
  const [isVideoCallLoading, setIsVideoCallLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleVideoCallClick = () => {
    setIsVideoCallLoading(true);
    toast.info("Connecting to video consultation...");
    
    // Simulate a small delay before navigating
    setTimeout(() => {
      setIsVideoCallLoading(false);
      navigate("/video-consultation");
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8 transition-all duration-300">
        <div className="flex justify-end mb-4">
          <ApiKeySettings />
        </div>
        
        <section className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-healthcare-700 dark:text-healthcare-100">
            Your Health Dashboard
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Monitor your vital signs and manage your healthcare needs in one place.
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-healthcare-500 hover:bg-healthcare-600 gap-2"
              onClick={handleVideoCallClick}
              disabled={isVideoCallLoading}
            >
              {isVideoCallLoading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Connecting to Doctor...
                </>
              ) : (
                <>
                  <Video className="h-5 w-5" />
                  Video Call with Doctor
                </>
              )}
            </Button>
            
            <Button 
              className="bg-healthcare-600 hover:bg-healthcare-700 gap-2"
              onClick={() => navigate("/medical-chat")}
            >
              <Globe className="h-5 w-5" />
              Multilingual Medical Assistant
            </Button>
          </div>
        </section>
        
        <section>
          <HealthMetrics />
        </section>
        
        <section>
          <RecentActivities />
        </section>
        
        <section id="emergency-call">
          <EmergencyCall />
        </section>
      </main>
      
      <footer className="bg-healthcare-100 dark:bg-healthcare-800 py-6">
        <div className="container mx-auto px-4 text-center text-healthcare-700 dark:text-healthcare-100">
          <p>&copy; {new Date().getFullYear()} Medibridge. All rights reserved.</p>
          <p className="mt-2 text-sm text-healthcare-500 dark:text-healthcare-300">
            This is a demo application. Not for actual medical use.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
