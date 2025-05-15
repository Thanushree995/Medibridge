
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Mic, MicOff, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the SpeechRecognition interface since TypeScript doesn't include it by default
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

// Define supported languages
const supportedLanguages = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Spanish (Spain)' },
  { code: 'fr-FR', name: 'French (France)' },
  { code: 'de-DE', name: 'German (Germany)' },
  { code: 'it-IT', name: 'Italian (Italy)' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'ru-RU', name: 'Russian (Russia)' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'ja-JP', name: 'Japanese (Japan)' },
  { code: 'hi-IN', name: 'Hindi (India)' },
];

const VoiceSymptomChecker = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // References for Web Speech API
  const recognitionRef = useRef<any>(null);
  
  // Initialize speech recognition on component mount or when language changes
  useEffect(() => {
    // Stop current recognition if it's running
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    // Initialize the SpeechRecognition object
    // @ts-ignore: Browser API not fully typed in TypeScript
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;
      
      recognitionRef.current.onresult = (event: any) => {
        const currentTranscript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        
        setTranscript(currentTranscript);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          // If we're supposed to be listening but recognition ended,
          // try to restart it (some browsers stop after silence)
          recognitionRef.current.start();
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        toast({
          title: "Error",
          description: `Speech recognition error: ${event.error}`,
          variant: "destructive",
        });
        setIsListening(false);
      };
    } else {
      toast({
        title: "Not supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
    }
    
    // Cleanup on component unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast, language]); // Re-initialize when language changes
  
  // Toggle listening state
  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isListening) {
      // Start listening
      setTranscript("");
      setAiResponse("");
      setIsListening(true);
      recognitionRef.current.start();
      toast({
        title: "Listening",
        description: "Speak clearly to describe your symptoms.",
      });
    } else {
      // Stop listening and process the transcript
      recognitionRef.current.stop();
      setIsListening(false);
      
      if (transcript.trim()) {
        processTranscript(transcript);
      }
    }
  };
  
  // Process transcript and get AI response
  const processTranscript = async (text: string) => {
    setIsProcessing(true);
    
    try {
      // In a real implementation, this would call GPT-4 API
      // For now, simulate an AI response
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate AI response based on common symptoms and current language
      let response = "";
      const lowerText = text.toLowerCase();
      
      const languageResponses: Record<string, {
        headache: string;
        respiratory: string;
        digestive: string;
        default: string;
      }> = {
        "en-US": {
          headache: "Based on your symptoms of headache and fever, you may have a common cold or flu. Please rest, stay hydrated, and monitor your temperature. If symptoms worsen or persist for more than 3 days, please consult a healthcare professional.",
          respiratory: "Your symptoms suggest a respiratory infection. Drink warm fluids, get plenty of rest, and consider over-the-counter cough relief medication. If you experience difficulty breathing or symptoms worsen, seek medical attention.",
          digestive: "Your digestive symptoms might indicate a stomach virus or food poisoning. Stay hydrated with clear fluids, eat bland foods, and avoid dairy and spicy items. If symptoms are severe or persist more than 24 hours, consult a doctor.",
          default: "I've analyzed your symptoms. While I can provide general guidance, I recommend consulting with a healthcare professional for an accurate diagnosis. Please remember that medical conditions require proper examination."
        },
        "es-ES": {
          headache: "Según sus síntomas de dolor de cabeza y fiebre, es posible que tenga un resfriado común o gripe. Por favor, descanse, manténgase hidratado y controle su temperatura. Si los síntomas empeoran o persisten por más de 3 días, consulte a un profesional de la salud.",
          respiratory: "Sus síntomas sugieren una infección respiratoria. Beba líquidos calientes, descanse mucho y considere medicamentos para la tos de venta libre. Si experimenta dificultad para respirar o los síntomas empeoran, busque atención médica.",
          digestive: "Sus síntomas digestivos podrían indicar un virus estomacal o intoxicación alimentaria. Manténgase hidratado con líquidos claros, coma alimentos blandos y evite los lácteos y alimentos picantes. Si los síntomas son graves o persisten más de 24 horas, consulte a un médico.",
          default: "He analizado sus síntomas. Si bien puedo proporcionar orientación general, le recomiendo consultar con un profesional de la salud para un diagnóstico preciso. Recuerde que las condiciones médicas requieren un examen adecuado."
        },
        "fr-FR": {
          headache: "D'après vos symptômes de maux de tête et de fièvre, vous pourriez avoir un rhume ou une grippe. Veuillez vous reposer, rester hydraté et surveiller votre température. Si les symptômes s'aggravent ou persistent plus de 3 jours, consultez un professionnel de la santé.",
          respiratory: "Vos symptômes suggèrent une infection respiratoire. Buvez des liquides chauds, reposez-vous suffisamment et envisagez des médicaments contre la toux en vente libre. Si vous éprouvez des difficultés respiratoires ou si les symptômes s'aggravent, consultez un médecin.",
          digestive: "Vos symptômes digestifs pourraient indiquer un virus gastrique ou une intoxication alimentaire. Restez hydraté avec des liquides clairs, mangez des aliments légers et évitez les produits laitiers et épicés. Si les symptômes sont graves ou persistent plus de 24 heures, consultez un médecin.",
          default: "J'ai analysé vos symptômes. Bien que je puisse vous donner des conseils généraux, je vous recommande de consulter un professionnel de la santé pour un diagnostic précis. N'oubliez pas que les conditions médicales nécessitent un examen approprié."
        },
        "de-DE": {
          headache: "Basierend auf Ihren Symptomen von Kopfschmerzen und Fieber könnten Sie eine Erkältung oder Grippe haben. Bitte ruhen Sie sich aus, bleiben Sie hydratisiert und überwachen Sie Ihre Temperatur. Wenn die Symptome sich verschlimmern oder länger als 3 Tage anhalten, konsultieren Sie bitte einen Arzt.",
          respiratory: "Ihre Symptome deuten auf eine Atemwegsinfektion hin. Trinken Sie warme Flüssigkeiten, ruhen Sie sich aus und erwägen Sie rezeptfreie Hustenmittel. Bei Atembeschwerden oder Verschlimmerung der Symptome suchen Sie einen Arzt auf.",
          digestive: "Ihre Verdauungssymptome könnten auf einen Magenvirus oder eine Lebensmittelvergiftung hindeuten. Bleiben Sie mit klaren Flüssigkeiten hydratisiert, essen Sie leichte Kost und vermeiden Sie Milchprodukte und scharfe Speisen. Wenn die Symptome schwerwiegend sind oder länger als 24 Stunden anhalten, konsultieren Sie einen Arzt.",
          default: "Ich habe Ihre Symptome analysiert. Während ich allgemeine Hinweise geben kann, empfehle ich Ihnen, für eine genaue Diagnose einen Arzt zu konsultieren. Bitte denken Sie daran, dass medizinische Zustände eine ordnungsgemäße Untersuchung erfordern."
        }
      };
      
      // Default to English if the selected language doesn't have predefined responses
      const responses = languageResponses[language] || languageResponses["en-US"];
      
      if (lowerText.includes('headache') || lowerText.includes('fever') || 
          lowerText.includes('dolor') || lowerText.includes('fiebre') ||
          lowerText.includes('kopfschmerzen') || lowerText.includes('fieber') ||
          lowerText.includes('mal de tête') || lowerText.includes('fièvre')) {
        response = responses.headache;
      } else if (lowerText.includes('cough') || lowerText.includes('throat') || 
                lowerText.includes('tos') || lowerText.includes('garganta') ||
                lowerText.includes('husten') || lowerText.includes('hals') ||
                lowerText.includes('toux') || lowerText.includes('gorge')) {
        response = responses.respiratory;
      } else if (lowerText.includes('stomachache') || lowerText.includes('nausea') ||
                lowerText.includes('estómago') || lowerText.includes('náusea') ||
                lowerText.includes('bauchschmerzen') || lowerText.includes('übelkeit') ||
                lowerText.includes('mal au ventre') || lowerText.includes('nausée')) {
        response = responses.digestive;
      } else {
        response = responses.default;
      }
      
      setAiResponse(response);
      
      // Use text-to-speech to read the response
      speakResponse(response, language);
    } catch (error) {
      console.error('Error processing transcript:', error);
      toast({
        title: "Error",
        description: "Failed to process your symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Text-to-speech function with language support
  const speakResponse = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a voice for the specific language
      const languageVoice = voices.find(voice => voice.lang.startsWith(lang.split('-')[0]));
      
      if (languageVoice) {
        utterance.voice = languageVoice;
      }
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Not supported",
        description: "Text-to-speech is not supported in this browser.",
      });
    }
  };
  
  // Handle language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    
    // If we're currently listening, restart with the new language
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      // Wait a moment before restarting with the new language
      setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.lang = value;
          recognitionRef.current.start();
        }
      }, 200);
    }
    
    toast({
      title: "Language Changed",
      description: `Voice assistant now using ${supportedLanguages.find(l => l.code === value)?.name}`,
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
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-healthcare-700 dark:text-healthcare-100">
            Voice Symptom Checker
          </h2>
          
          <div className="flex items-center">
            <Globe className="mr-2 h-5 w-5 text-healthcare-500" />
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {supportedLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card className="p-6 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {language === "en-US" && "Please press the microphone button and clearly describe your symptoms."}
              {language === "es-ES" && "Por favor, presione el botón del micrófono y describa claramente sus síntomas."}
              {language === "fr-FR" && "Veuillez appuyer sur le bouton du microphone et décrire clairement vos symptômes."}
              {language === "de-DE" && "Bitte drücken Sie die Mikrofontaste und beschreiben Sie deutlich Ihre Symptome."}
              {language === "it-IT" && "Si prega di premere il pulsante del microfono e descrivere chiaramente i sintomi."}
              {language === "pt-BR" && "Por favor, pressione o botão do microfone e descreva claramente seus sintomas."}
              {language === "ru-RU" && "Пожалуйста, нажмите кнопку микрофона и четко опишите ваши симптомы."}
              {language === "zh-CN" && "请按麦克风按钮，清楚地描述您的症状。"}
              {language === "ja-JP" && "マイクボタンを押して、症状を明確に説明してください。"}
              {language === "hi-IN" && "कृपया माइक्रोफोन बटन दबाएं और अपने लक्षणों का स्पष्ट रूप से वर्णन करें।"}
            </p>
            
            <Button 
              size="lg" 
              className={`rounded-full p-8 ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-healthcare-500 hover:bg-healthcare-600'}`}
              onClick={toggleListening}
              disabled={isProcessing}
            >
              {isListening ? (
                <MicOff className="h-10 w-10" />
              ) : (
                <Mic className="h-10 w-10" />
              )}
            </Button>
            
            <p className="mt-4 text-sm text-gray-500">
              {isListening ? (
                language === "en-US" ? "Listening... Speak now" :
                language === "es-ES" ? "Escuchando... Hable ahora" :
                language === "fr-FR" ? "Écoute en cours... Parlez maintenant" :
                language === "de-DE" ? "Ich höre zu... Sprechen Sie jetzt" :
                language === "it-IT" ? "Ascolto... Parla ora" :
                language === "pt-BR" ? "Ouvindo... Fale agora" :
                language === "ru-RU" ? "Слушаю... Говорите сейчас" :
                language === "zh-CN" ? "正在听取...现在说话" :
                language === "ja-JP" ? "聴いています...今話してください" :
                language === "hi-IN" ? "सुन रहा है... अब बोलें" :
                "Listening... Speak now"
              ) : (
                language === "en-US" ? "Tap to speak" :
                language === "es-ES" ? "Toque para hablar" :
                language === "fr-FR" ? "Appuyez pour parler" :
                language === "de-DE" ? "Tippen zum Sprechen" :
                language === "it-IT" ? "Tocca per parlare" :
                language === "pt-BR" ? "Toque para falar" :
                language === "ru-RU" ? "Нажмите, чтобы говорить" :
                language === "zh-CN" ? "点击说话" :
                language === "ja-JP" ? "タップして話す" :
                language === "hi-IN" ? "बोलने के लिए टैप करें" :
                "Tap to speak"
              )}
            </p>
          </div>
          
          {(transcript || isProcessing) && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-healthcare-800 rounded-lg">
              <h3 className="font-medium mb-2">
                {language === "en-US" ? "Your symptoms:" :
                language === "es-ES" ? "Sus síntomas:" :
                language === "fr-FR" ? "Vos symptômes:" :
                language === "de-DE" ? "Ihre Symptome:" :
                language === "it-IT" ? "I tuoi sintomi:" :
                language === "pt-BR" ? "Seus sintomas:" :
                language === "ru-RU" ? "Ваши симптомы:" :
                language === "zh-CN" ? "您的症状：" :
                language === "ja-JP" ? "あなたの症状：" :
                language === "hi-IN" ? "आपके लक्षण:" :
                "Your symptoms:"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {transcript || (isProcessing ? (
                  language === "en-US" ? "Processing your speech..." :
                  language === "es-ES" ? "Procesando su voz..." :
                  language === "fr-FR" ? "Traitement de votre parole..." :
                  language === "de-DE" ? "Verarbeite Ihre Sprache..." :
                  language === "it-IT" ? "Elaborazione del tuo discorso..." :
                  language === "pt-BR" ? "Processando sua fala..." :
                  language === "ru-RU" ? "Обработка вашей речи..." :
                  language === "zh-CN" ? "正在处理您的语音..." :
                  language === "ja-JP" ? "あなたの音声を処理中..." :
                  language === "hi-IN" ? "आपकी स्पीच प्रोसेस हो रही है..." :
                  "Processing your speech..."
                ) : "")}
              </p>
              
              {isProcessing && (
                <div className="mt-4 flex items-center justify-center">
                  <div className="animate-spin h-6 w-6 border-2 border-healthcare-500 border-t-transparent rounded-full"></div>
                  <span className="ml-2">
                    {language === "en-US" ? "Analyzing symptoms..." :
                    language === "es-ES" ? "Analizando síntomas..." :
                    language === "fr-FR" ? "Analyse des symptômes..." :
                    language === "de-DE" ? "Symptome werden analysiert..." :
                    language === "it-IT" ? "Analisi dei sintomi..." :
                    language === "pt-BR" ? "Analisando sintomas..." :
                    language === "ru-RU" ? "Анализ симптомов..." :
                    language === "zh-CN" ? "正在分析症状..." :
                    language === "ja-JP" ? "症状を分析中..." :
                    language === "hi-IN" ? "लक्षणों का विश्लेषण किया जा रहा है..." :
                    "Analyzing symptoms..."}
                  </span>
                </div>
              )}
              
              {aiResponse && (
                <div className="mt-6 p-4 bg-healthcare-50 dark:bg-healthcare-700 rounded-lg">
                  <h3 className="font-medium mb-2 text-healthcare-700 dark:text-healthcare-100">
                    {language === "en-US" ? "AI Assessment:" :
                    language === "es-ES" ? "Evaluación de la IA:" :
                    language === "fr-FR" ? "Évaluation de l'IA:" :
                    language === "de-DE" ? "KI-Bewertung:" :
                    language === "it-IT" ? "Valutazione dell'IA:" :
                    language === "pt-BR" ? "Avaliação da IA:" :
                    language === "ru-RU" ? "Оценка ИИ:" :
                    language === "zh-CN" ? "AI评估：" :
                    language === "ja-JP" ? "AI評価：" :
                    language === "hi-IN" ? "AI मूल्यांकन:" :
                    "AI Assessment:"}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{aiResponse}</p>
                  <p className="mt-4 text-sm text-red-500 dark:text-red-400">
                    {language === "en-US" ? "Note: This is not a medical diagnosis. Always consult with a healthcare professional." :
                    language === "es-ES" ? "Nota: Esto no es un diagnóstico médico. Siempre consulte con un profesional de la salud." :
                    language === "fr-FR" ? "Remarque: Ce n'est pas un diagnostic médical. Consultez toujours un professionnel de la santé." :
                    language === "de-DE" ? "Hinweis: Dies ist keine medizinische Diagnose. Konsultieren Sie immer einen Arzt." :
                    language === "it-IT" ? "Nota: Questa non è una diagnosi medica. Consultare sempre un professionista sanitario." :
                    language === "pt-BR" ? "Nota: Isto não é um diagnóstico médico. Consulte sempre um profissional de saúde." :
                    language === "ru-RU" ? "Примечание: Это не медицинский диагноз. Всегда консультируйтесь с медицинским работником." :
                    language === "zh-CN" ? "注意：这不是医疗诊断。始终咨询医疗专业人员。" :
                    language === "ja-JP" ? "注意：これは医学的診断ではありません。常に医療専門家に相談してください。" :
                    language === "hi-IN" ? "नोट: यह चिकित्सा निदान नहीं है। हमेशा स्वास्थ्य देखभाल पेशेवर से परामर्श करें।" :
                    "Note: This is not a medical diagnosis. Always consult with a healthcare professional."}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => speakResponse(aiResponse, language)}
                    >
                      {language === "en-US" ? "Play Again" :
                      language === "es-ES" ? "Reproducir de nuevo" :
                      language === "fr-FR" ? "Rejouer" :
                      language === "de-DE" ? "Erneut abspielen" :
                      language === "it-IT" ? "Riproduci ancora" :
                      language === "pt-BR" ? "Reproduzir novamente" :
                      language === "ru-RU" ? "Воспроизвести снова" :
                      language === "zh-CN" ? "重新播放" :
                      language === "ja-JP" ? "もう一度再生" :
                      language === "hi-IN" ? "फिर से चलाएं" :
                      "Play Again"}
                    </Button>
                  </div>
                </div>
              )}
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

export default VoiceSymptomChecker;
