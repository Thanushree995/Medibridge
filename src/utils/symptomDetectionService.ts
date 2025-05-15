
import { useState, useEffect } from 'react';

// Types for our symptom detection system
export interface Symptom {
  id: string;
  name: string;
  keywords: string[];
}

export interface Disease {
  id: string;
  name: string;
  symptoms: string[];
  description: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
}

// Dataset of common symptoms for detection
// This is a simplified version - in a real implementation, this would be loaded from a trained model
export const symptoms: Symptom[] = [
  {
    id: 'fever',
    name: 'Fever',
    keywords: ['fever', 'high temperature', 'hot', 'temperature', 'fiebre', 'febre', 'fieber', 'fièvre', '发烧', '熱', 'बुखार']
  },
  {
    id: 'cough',
    name: 'Cough',
    keywords: ['cough', 'coughing', 'tos', 'tosse', 'husten', 'toux', '咳嗽', 'खांसी']
  },
  {
    id: 'headache',
    name: 'Headache',
    keywords: ['headache', 'head pain', 'dolor de cabeza', 'dor de cabeça', 'kopfschmerzen', 'mal de tête', '头痛', '頭痛', 'सिरदर्द']
  },
  {
    id: 'sore_throat',
    name: 'Sore Throat',
    keywords: ['sore throat', 'throat pain', 'dolor de garganta', 'dor de garganta', 'halsschmerzen', 'mal de gorge', '喉咙痛', '喉の痛み', 'गले में खराश']
  },
  {
    id: 'runny_nose',
    name: 'Runny Nose',
    keywords: ['runny nose', 'nasal congestion', 'nariz que moquea', 'coriza', 'laufende nase', 'nez qui coule', '流鼻涕', '鼻水', 'बहती नाक']
  },
  {
    id: 'fatigue',
    name: 'Fatigue',
    keywords: ['fatigue', 'tired', 'exhausted', 'fatiga', 'cansancio', 'müdigkeit', 'fatigue', '疲劳', '疲れ', 'थकान']
  },
  {
    id: 'nausea',
    name: 'Nausea',
    keywords: ['nausea', 'feeling sick', 'náusea', 'übelkeit', 'nausée', '恶心', '吐き気', 'मतली']
  },
  {
    id: 'diarrhea',
    name: 'Diarrhea',
    keywords: ['diarrhea', 'loose stool', 'diarrea', 'durchfall', 'diarrhée', '腹泻', '下痢', 'दस्त']
  },
  {
    id: 'body_aches',
    name: 'Body Aches',
    keywords: ['body ache', 'muscle pain', 'dolor corporal', 'dolores musculares', 'gliederschmerzen', 'douleurs musculaires', '身体疼痛', '体の痛み', 'शरीर में दर्द']
  },
  {
    id: 'chills',
    name: 'Chills',
    keywords: ['chills', 'shivering', 'escalofríos', 'schüttelfrost', 'frissons', '发冷', '寒気', 'ठंड लगना']
  }
];

// Dataset of diseases based on symptom combinations
export const diseases: Disease[] = [
  {
    id: 'common_cold',
    name: 'Common Cold',
    symptoms: ['runny_nose', 'cough', 'sore_throat', 'fatigue'],
    description: 'A viral infection of the upper respiratory tract. Usually harmless and resolves within 7-10 days.',
    recommendations: [
      'Rest and stay hydrated', 
      'Use over-the-counter cold medications if needed',
      'Use a humidifier to ease congestion',
      'Try salt water gargle for sore throat'
    ],
    severity: 'low'
  },
  {
    id: 'flu',
    name: 'Influenza (Flu)',
    symptoms: ['fever', 'cough', 'body_aches', 'fatigue', 'chills', 'headache'],
    description: 'A contagious respiratory illness caused by influenza viruses. More severe than a common cold.',
    recommendations: [
      'Rest and stay hydrated',
      'Take fever reducers like acetaminophen or ibuprofen',
      'Consult a doctor if symptoms are severe',
      'Consider annual flu vaccination for prevention'
    ],
    severity: 'medium'
  },
  {
    id: 'gastroenteritis',
    name: 'Gastroenteritis',
    symptoms: ['nausea', 'diarrhea', 'fever', 'fatigue'],
    description: 'An intestinal infection marked by diarrhea, nausea, and sometimes vomiting. Often called stomach flu.',
    recommendations: [
      'Stay hydrated with clear liquids',
      'Eat bland foods when returning to solid diet',
      'Avoid dairy, caffeine, and spicy foods',
      'Seek medical care if symptoms persist beyond 3 days'
    ],
    severity: 'medium'
  },
  {
    id: 'migraine',
    name: 'Migraine',
    symptoms: ['headache', 'nausea', 'fatigue'],
    description: 'A neurological condition that can cause severe headaches, often with nausea and sensitivity to light and sound.',
    recommendations: [
      'Rest in a quiet, dark room',
      'Apply cold compresses to your forehead',
      'Consider over-the-counter pain relievers',
      'Consult a doctor for recurring migraines'
    ],
    severity: 'medium'
  },
  {
    id: 'strep_throat',
    name: 'Strep Throat',
    symptoms: ['sore_throat', 'fever', 'headache'],
    description: 'A bacterial infection that causes inflammation and pain in the throat.',
    recommendations: [
      'See a doctor for proper diagnosis and antibiotics',
      'Rest and drink warm liquids',
      'Take pain relievers for discomfort',
      'Use throat lozenges to soothe pain'
    ],
    severity: 'medium'
  }
];

// Function to detect symptoms from text
export function detectSymptoms(text: string): Symptom[] {
  const lowerText = text.toLowerCase();
  return symptoms.filter(symptom => 
    symptom.keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))
  );
}

// Function to identify possible diseases based on detected symptoms
export function identifyDiseases(detectedSymptomIds: string[]): Disease[] {
  if (!detectedSymptomIds.length) return [];
  
  return diseases
    .map(disease => {
      // Calculate how many of the disease's symptoms match the detected symptoms
      const matchCount = disease.symptoms.filter(s => detectedSymptomIds.includes(s)).length;
      // Calculate match percentage
      const matchPercentage = disease.symptoms.length > 0 
        ? matchCount / disease.symptoms.length
        : 0;
      
      return {
        disease,
        matchCount,
        matchPercentage
      };
    })
    .filter(result => result.matchPercentage > 0.3) // At least 30% match
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .map(result => result.disease);
}

// Custom hook to use our symptom detection
export function useSymptomDetection() {
  const [detectedSymptoms, setDetectedSymptoms] = useState<Symptom[]>([]);
  const [possibleDiseases, setPossibleDiseases] = useState<Disease[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeText = async (text: string) => {
    setAnalyzing(true);
    
    try {
      // Detect symptoms from the text
      const foundSymptoms = detectSymptoms(text);
      setDetectedSymptoms(foundSymptoms);
      
      // Identify possible diseases
      const symptomIds = foundSymptoms.map(s => s.id);
      const diseases = identifyDiseases(symptomIds);
      setPossibleDiseases(diseases);
      
      return {
        symptoms: foundSymptoms,
        diseases: diseases
      };
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      return {
        symptoms: [],
        diseases: []
      };
    } finally {
      setAnalyzing(false);
    }
  };
  
  return {
    detectedSymptoms,
    possibleDiseases,
    analyzing,
    analyzeText
  };
}

// Function to generate a response based on detected conditions
export function generateDiseaseResponse(disease: Disease, language: string): string {
  // Base response in English
  let response = `Based on the symptoms you've described, you may have ${disease.name}. ${disease.description} `;
  response += `Recommendations: ${disease.recommendations.join('. ')}. `;
  
  if (disease.severity === 'medium' || disease.severity === 'high') {
    response += `Please note that this condition is of ${disease.severity} severity. If symptoms worsen or persist, please consult a healthcare professional.`;
  } else {
    response += `This condition is generally of low severity, but if symptoms persist for more than a few days, consider seeking medical advice.`;
  }

  // In a real implementation, we would translate this response to the user's language
  // For now, we just return the English response
  // The MedicalChat component will handle the translation
  
  return response;
}

// Function to get a general response when no specific disease is identified
export function generateGeneralResponse(symptoms: Symptom[]): string {
  if (symptoms.length === 0) {
    return "I couldn't identify specific symptoms from your description. Could you please provide more details about how you're feeling?";
  }
  
  const symptomNames = symptoms.map(s => s.name).join(', ');
  
  return `I've identified that you're experiencing the following symptoms: ${symptomNames}. Without more information, I can't determine a specific condition. These symptoms could be related to several different issues. I recommend monitoring your symptoms and consulting with a healthcare professional if they worsen or persist. Would you like to provide more details about how you're feeling?`;
}
