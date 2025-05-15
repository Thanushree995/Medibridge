
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Calendar, Clock, Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import JitsiVideoCall from "@/components/JitsiVideoCall";
import { toast } from "@/components/ui/sonner";

const VideoConsultation = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const [isJoiningCall, setIsJoiningCall] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  
  const handleScheduleConsultation = () => {
    // Basic validation
    if (!selectedDate || !selectedTime || !selectedDoctor || !reason) {
      toast.error("Missing information", {
        description: "Please fill in all the required fields."
      });
      return;
    }
    
    setIsScheduling(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Consultation Scheduled", {
        description: `Your appointment with Dr. ${selectedDoctor} on ${selectedDate} at ${selectedTime} has been confirmed.`
      });
      setIsScheduling(false);
      
      // Clear form fields after successful scheduling
      setSelectedDate("");
      setSelectedTime("");
      setSelectedDoctor("");
      setReason("");
    }, 2000);
  };

  const handleJoinVideoCall = () => {
    setIsJoiningCall(true);
    toast.info("Preparing video call...", {
      description: "Requesting camera and microphone permissions"
    });
    
    // Request camera and microphone permissions
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(() => {
        // Permissions granted, start the video call after a short delay
        setTimeout(() => {
          setIsJoiningCall(false);
          setIsInVideoCall(true);
          toast.success("Connected to video call", {
            description: "You've joined care-assist-room"
          });
        }, 1500);
      })
      .catch((err) => {
        // Permissions denied
        console.error("Media access error:", err);
        setIsJoiningCall(false);
        toast.error("Permission Denied", {
          description: "Camera and microphone access is required for video calls."
        });
      });
  };

  const handleCloseVideoCall = () => {
    setIsInVideoCall(false);
    toast.info("Call Ended", {
      description: "You have left the video call."
    });
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
          Video Consultation
        </h2>

        {isInVideoCall ? (
          <JitsiVideoCall 
            roomName="care-assist-room" 
            onClose={handleCloseVideoCall} 
          />
        ) : (
          <>
            <div className="mb-8 flex justify-center">
              <Button
                className="bg-healthcare-500 hover:bg-healthcare-600 text-white p-4 text-lg gap-3"
                onClick={handleJoinVideoCall}
                disabled={isJoiningCall}
              >
                {isJoiningCall ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Connecting to Video Call...
                  </>
                ) : (
                  <>
                    <Video className="h-5 w-5" />
                    Join Video Call Now
                  </>
                )}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-healthcare-600 dark:text-healthcare-200 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule a Consultation
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="doctor">Select Doctor</Label>
                    <Select 
                      value={selectedDoctor} 
                      onValueChange={(value) => setSelectedDoctor(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a specialist" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Emily Johnson">Dr. Emily Johnson - General Medicine</SelectItem>
                        <SelectItem value="Michael Chen">Dr. Michael Chen - Cardiology</SelectItem>
                        <SelectItem value="Sarah Williams">Dr. Sarah Williams - Pediatrics</SelectItem>
                        <SelectItem value="David Rodriguez">Dr. David Rodriguez - Neurology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Select Date</Label>
                    <Input
                      id="date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="time">Select Time</Label>
                    <Select value={selectedTime} onValueChange={(value) => setSelectedTime(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                        <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                        <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                        <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="reason">Reason for Consultation</Label>
                    <Input
                      id="reason"
                      placeholder="Briefly describe your symptoms or concerns"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-healthcare-500 hover:bg-healthcare-600"
                    onClick={handleScheduleConsultation}
                    disabled={isScheduling}
                  >
                    {isScheduling ? (
                      <>
                        <Loader className="h-5 w-5 mr-2 animate-spin" />
                        Scheduling...
                      </>
                    ) : (
                      "Schedule Consultation"
                    )}
                  </Button>
                </div>
              </Card>
              
              <Card className="p-6 flex flex-col">
                <h3 className="text-xl font-semibold mb-4 text-healthcare-600 dark:text-healthcare-200 flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  How Video Consultations Work
                </h3>
                
                <div className="space-y-6 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="bg-healthcare-100 dark:bg-healthcare-700 rounded-full p-2 text-healthcare-500 dark:text-healthcare-200">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Schedule an Appointment</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Choose your preferred doctor, date, and time for the consultation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-healthcare-100 dark:bg-healthcare-700 rounded-full p-2 text-healthcare-500 dark:text-healthcare-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <line x1="12" y1="3" x2="12" y2="5" />
                        <line x1="12" y1="19" x2="12" y2="21" />
                        <circle cx="7" cy="12" r="1" />
                        <circle cx="17" cy="12" r="1" />
                        <path d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Receive Confirmation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        You'll receive an email with a link to join the video consultation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-healthcare-100 dark:bg-healthcare-700 rounded-full p-2 text-healthcare-500 dark:text-healthcare-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Join the Consultation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Click the link at your scheduled time. Our system works on mobile devices and computers.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-healthcare-100 dark:bg-healthcare-700 rounded-full p-2 text-healthcare-500 dark:text-healthcare-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <line x1="10" y1="9" x2="8" y2="9" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Follow-up</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        After the consultation, you'll receive a summary and any prescriptions or referrals needed.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-healthcare-50 dark:bg-healthcare-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong className="text-healthcare-600 dark:text-healthcare-200">Need help?</strong> Our support team is available 24/7 to assist with technical issues.
                  </p>
                  <Button variant="link" className="text-healthcare-500 p-0 h-auto font-normal">
                    Contact Support
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}
      </main>
      
      <footer className="bg-healthcare-100 dark:bg-healthcare-800 py-6">
        <div className="container mx-auto px-4 text-center text-healthcare-700 dark:text-healthcare-100">
          <p>&copy; {new Date().getFullYear()} CareAssist AI Bridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default VideoConsultation;
