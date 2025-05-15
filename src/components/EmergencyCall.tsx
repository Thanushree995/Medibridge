
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export function EmergencyCall() {
  const [isLoading, setIsLoading] = useState(false);

  const handleEmergencyCall = () => {
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // In a real app, this might trigger an emergency call
      // or send an alert to emergency contacts
      toast.success("Emergency services have been notified", {
        description: "A representative will contact you shortly"
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="mt-8 flex justify-center">
      <Button 
        onClick={handleEmergencyCall}
        size="lg" 
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader className="h-6 w-6 mr-2 animate-spin" />
            Contacting Emergency Services...
          </>
        ) : (
          <>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 mr-2" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Emergency Call
          </>
        )}
      </Button>
    </div>
  );
}
