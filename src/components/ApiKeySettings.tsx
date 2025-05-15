
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setGoogleApiKey, setOpenAIApiKey } from "@/utils/translationService";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ApiKeySettings() {
  const [googleApiKey, setGoogleTranslateKey] = useState("");
  const [openAiApiKey, setOpenAiKey] = useState("");
  const [open, setOpen] = useState(false);
  
  const handleSaveGoogleApiKey = () => {
    if (!googleApiKey.trim()) {
      toast.error("Please enter a valid Google Translate API key");
      return;
    }
    
    try {
      setGoogleApiKey(googleApiKey);
      toast.success("Google Translate API key saved successfully");
    } catch (error) {
      toast.error("Failed to save Google Translate API key");
      console.error("Error saving API key:", error);
    }
  };
  
  const handleSaveOpenAiKey = () => {
    if (!openAiApiKey.trim()) {
      toast.error("Please enter a valid OpenAI API key");
      return;
    }
    
    try {
      setOpenAIApiKey(openAiApiKey);
      toast.success("OpenAI API key saved successfully");
    } catch (error) {
      toast.error("Failed to save OpenAI API key");
      console.error("Error saving API key:", error);
    }
  };

  const handleSaveAllKeys = () => {
    if (googleApiKey.trim()) {
      handleSaveGoogleApiKey();
    }
    
    if (openAiApiKey.trim()) {
      handleSaveOpenAiKey();
    }
    
    if ((googleApiKey.trim() || openAiApiKey.trim())) {
      setOpen(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 bg-white dark:bg-gray-800"
        >
          <Settings className="h-4 w-4" />
          API Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Settings</DialogTitle>
          <DialogDescription>
            Configure API keys for translation and AI features.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="google" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="google">Google Translate</TabsTrigger>
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="google" className="space-y-4 mt-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Enter your Google Cloud Translate API key to enable multilingual features.
              </p>
              <p className="text-xs text-muted-foreground">
                You can get an API key from the Google Cloud Console.
                <a 
                  href="https://console.cloud.google.com/apis/credentials" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-healthcare-500 hover:text-healthcare-600 ml-1"
                >
                  Learn more
                </a>
              </p>
            </div>
            <Input
              id="googleApiKey"
              value={googleApiKey}
              onChange={(e) => setGoogleTranslateKey(e.target.value)}
              placeholder="Enter Google Translate API key"
            />
            <Button onClick={handleSaveGoogleApiKey} className="w-full">Save Google API Key</Button>
          </TabsContent>
          
          <TabsContent value="openai" className="space-y-4 mt-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Enter your OpenAI API key to enable AI medical assistant features.
              </p>
              <p className="text-xs text-muted-foreground">
                You can get an API key from the OpenAI platform.
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-healthcare-500 hover:text-healthcare-600 ml-1"
                >
                  Learn more
                </a>
              </p>
            </div>
            <Input
              id="openaiApiKey"
              value={openAiApiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
              placeholder="Enter OpenAI API key"
              type="password"
            />
            <Button onClick={handleSaveOpenAiKey} className="w-full">Save OpenAI API Key</Button>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveAllKeys}>Save All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
