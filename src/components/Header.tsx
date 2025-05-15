
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { 
  Mic, 
  Hand, 
  MessageCircle, 
  Video, 
  AlarmClock,
  Heart,
  Menu, 
  X,
  LogOut,
  User
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const navItems = [
    { icon: Mic, label: "Voice Symptom Checker", route: "/voice-symptom-checker" },
    { icon: Hand, label: "Gesture Control", route: "/gesture-control" },
    { icon: MessageCircle, label: "Medical Chat", route: "/medical-chat" },
    { icon: Video, label: "Video Consultation", route: "/video-consultation" },
    { icon: AlarmClock, label: "Medicine Reminder", route: "/medicine-reminder" },
    { icon: Heart, label: "Health Fitness", route: "/health-fitness" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  
  return (
    <header className="bg-white dark:bg-healthcare-800 shadow-sm py-4 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-healthcare-500 text-white p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-healthcare-700 dark:text-healthcare-100">
              Medibridge
            </h1>
          </Link>
          
          {/* Mobile menu button */}
          {isMobile && (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[80vh]">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Navigation</h2>
                    <DrawerClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </DrawerClose>
                  </div>
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <Link 
                        key={item.route}
                        to={item.route} 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-healthcare-50 dark:hover:bg-healthcare-700 transition-colors"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className="h-6 w-6 min-w-6 text-healthcare-500" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>

        {/* Desktop sidebar */}
        {!isMobile && (
          <div className={`fixed left-0 top-16 h-full bg-white dark:bg-healthcare-800 shadow-lg z-20 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            
            <div className="mt-12 space-y-1 p-2">
              {navItems.map((item) => (
                <Link 
                  key={item.route}
                  to={item.route} 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-healthcare-50 dark:hover:bg-healthcare-700 transition-colors"
                >
                  <div className="flex items-center justify-center w-6 h-6 min-w-6">
                    <item.icon className="h-6 w-6 text-healthcare-500" />
                  </div>
                  <span className={`text-sm whitespace-nowrap transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <User size={18} />
                  <span className="hidden sm:inline">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"} 
                className="text-healthcare-600 border-healthcare-200 hover:bg-healthcare-50"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
              <Button 
                size={isMobile ? "sm" : "default"} 
                className="bg-healthcare-500 hover:bg-healthcare-600"
                onClick={() => {
                  navigate("/auth");
                  setTimeout(() => document.querySelector('[data-value="register"]')?.dispatchEvent(new MouseEvent('click')), 100);
                }}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
