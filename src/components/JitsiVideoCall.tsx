
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, VideoOff, Mic, MicOff, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface JitsiVideoCallProps {
  roomName: string;
  onClose: () => void;
}

const JitsiVideoCall: React.FC<JitsiVideoCallProps> = ({ roomName, onClose }) => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const jitsiApiRef = useRef<any>(null);

  useEffect(() => {
    // Function to load Jitsi Meet API script
    const loadJitsiScript = () => {
      if (window.JitsiMeetExternalAPI) {
        // If already loaded, initialize directly
        initJitsiMeet();
        return;
      }

      // Add Jitsi Meet API script
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = initJitsiMeet;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    };

    // Function to initialize Jitsi Meet
    const initJitsiMeet = () => {
      if (!jitsiContainerRef.current) return;
      
      try {
        const domain = "meet.jit.si";
        const options = {
          roomName,
          width: "100%",
          height: "100%",
          parentNode: jitsiContainerRef.current,
          configOverwrite: {
            prejoinPageEnabled: false,
            startWithAudioMuted: false,
            startWithVideoMuted: false
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
              'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
            ],
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_BACKGROUND: '#3d3d3d'
          },
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);
        
        // Add event listeners
        api.addEventListeners({
          videoConferenceJoined: () => {
            toast({
              title: "Joined Video Call",
              description: `You've successfully joined ${roomName}.`
            });
          },
          participantJoined: (participant: any) => {
            toast({
              title: "Participant Joined",
              description: `${participant.displayName || "A participant"} has joined the call.`
            });
          },
          readyToClose: () => {
            onClose();
          }
        });
        
        jitsiApiRef.current = api;
      } catch (error) {
        console.error("Failed to initialize Jitsi Meet:", error);
        toast({
          variant: "destructive",
          title: "Video Call Error",
          description: "Failed to initialize the video call. Please try again."
        });
      }
    };

    loadJitsiScript();

    // Cleanup function
    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
    };
  }, [roomName, toast, onClose]);

  // Function to toggle audio
  const toggleAudio = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleAudio');
    }
  };

  // Function to toggle video
  const toggleVideo = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('toggleVideo');
    }
  };

  return (
    <Card className="w-full h-[80vh] flex flex-col relative">
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleAudio}
          className="bg-white/80 hover:bg-white"
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleVideo}
          className="bg-white/80 hover:bg-white"
        >
          <Video className="h-4 w-4" />
        </Button>
        <Button 
          variant="destructive" 
          size="icon" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div 
        ref={jitsiContainerRef} 
        className="w-full h-full"
      />
    </Card>
  );
};

export default JitsiVideoCall;
