
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Hand, Video, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const GestureControl = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Start webcam stream
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640,
          height: 480,
          facingMode: "user"
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
      toast({
        title: "Camera active",
        description: "Show your hand gestures clearly in front of the camera.",
      });
      
      // In a real implementation, this would connect to a gesture recognition API
      setTimeout(() => {
        setDetectedGesture("Open palm detected - Navigation mode activated");
      }, 2000);
      
      return true;
    } catch (error) {
      console.error("Error accessing webcam:", error);
      toast({
        title: "Camera access failed",
        description: "Please allow camera access to use gesture controls.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Stop webcam stream
  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };
  
  // Toggle gesture detection
  const toggleDetection = async () => {
    if (!isDetecting) {
      const started = await startWebcam();
      if (started) {
        setIsDetecting(true);
      }
    } else {
      stopWebcam();
      setIsDetecting(false);
      setDetectedGesture("");
    }
  };
  
  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);
  
  // Simulate gesture commands
  const simulateGestureCommand = (command: string) => {
    setDetectedGesture(`${command} gesture detected`);
    toast({
      title: "Gesture Detected",
      description: command,
    });
    
    // Simulate actions based on gestures
    switch(command) {
      case "Navigate Home":
        setTimeout(() => navigate("/"), 1500);
        break;
      case "Open Medical Chat":
        setTimeout(() => navigate("/medical-chat"), 1500);
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          &larr; Back to Home
        </Button>
        
        <h2 className="text-3xl font-bold mb-6 text-healthcare-700 dark:text-healthcare-100">
          Gesture Control Interface
        </h2>
        
        <Card className="p-6 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Enable gesture-based navigation to control the interface using hand movements.
              Perfect for users with limited mobility.
            </p>
            
            <div className="relative mx-auto w-full max-w-md h-64 bg-gray-100 dark:bg-healthcare-900 rounded-lg mb-6 overflow-hidden">
              {isDetecting ? (
                <>
                  <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ display: 'none' }}  
                  />
                  <Button 
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={toggleDetection}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Video className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-4 text-gray-500">Camera feed will appear here</p>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              className={`${isDetecting ? 'bg-red-500 hover:bg-red-600' : 'bg-healthcare-500 hover:bg-healthcare-600'}`}
              onClick={toggleDetection}
            >
              {isDetecting ? "Stop Detection" : "Start Gesture Detection"}
            </Button>
          </div>
          
          {isDetecting && (
            <div className="mt-6 p-4 bg-healthcare-50 dark:bg-healthcare-800 rounded-lg">
              <h3 className="font-medium mb-2">Detected Gesture:</h3>
              <p className="text-healthcare-700 dark:text-healthcare-200">
                {detectedGesture || "No gesture detected yet. Try moving your hand."}
              </p>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-healthcare-700 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2 text-healthcare-600 dark:text-healthcare-100">Available Gestures:</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li>✋ Open palm - Navigation mode</li>
                    <li>👆 Pointing up - Select item</li>
                    <li>✌️ Peace sign - Go back</li>
                    <li>👍 Thumbs up - Confirm action</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-white dark:bg-healthcare-700 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2 text-healthcare-600 dark:text-healthcare-100">Test Gestures:</h4>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" onClick={() => simulateGestureCommand("Navigate Home")}>
                      Simulate "Navigate Home"
                    </Button>
                    <Button size="sm" onClick={() => simulateGestureCommand("Open Medical Chat")}>
                      Simulate "Open Chat"
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </main>
      
      <footer className="bg-healthcare-100 dark:bg-healthcare-800 py-6">
        <div className="container mx-auto px-4 text-center text-healthcare-700 dark:text-healthcare-100">
          <p>&copy; {new Date().getFullYear()} CareAssist AI Bridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GestureControl;
