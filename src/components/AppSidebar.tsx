
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Activity, 
  Phone, 
  Video, 
  Globe, 
  Bell, 
  Heart 
} from "lucide-react";

export function AppSidebar() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Video Consultation",
      icon: Video,
      path: "/video-consultation",
    },
    {
      title: "Medical Chat",
      icon: Globe,
      path: "/medical-chat",
    },
    {
      title: "Voice Symptom Checker",
      icon: Activity,
      path: "/voice-symptom-checker",
    },
    {
      title: "Medicine Reminder",
      icon: Bell,
      path: "/medicine-reminder",
    },
    {
      title: "Health & Fitness",
      icon: Heart,
      path: "/health-fitness",
    },
    {
      title: "Emergency Call",
      icon: Phone,
      path: "#emergency-call",
      onClick: () => {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById("emergency-call");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  ];

  return (
    <Sidebar
      variant="sidebar"
      className="border-r border-border"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {features.map((feature) => (
                <SidebarMenuItem key={feature.title}>
                  <SidebarMenuButton
                    tooltip={feature.title}
                    onClick={feature.onClick || (() => navigate(feature.path))}
                  >
                    <feature.icon className="h-5 w-5" />
                    <span>{feature.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-2 py-4" />
    </Sidebar>
  );
}
