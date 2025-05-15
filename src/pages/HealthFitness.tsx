
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Utensils, Activity } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const HealthFitness = () => {
  const { toast } = useToast();
  const [weight, setWeight] = useState<number>(70); // Default weight in kg
  const [height, setHeight] = useState<number>(170); // Default height in cm
  const [age, setAge] = useState<number>(30); // Default age
  const [gender, setGender] = useState<string>("male"); // Default gender
  const [activity, setActivity] = useState<string>("moderate"); // Default activity level
  
  // Calculate recommended water intake (in liters)
  const calculateWaterIntake = (): number => {
    // Basic formula: weight in kg × 0.033 = liters per day
    return parseFloat((weight * 0.033).toFixed(1));
  };
  
  // Calculate recommended calories
  const calculateCalories = (): number => {
    // Using Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    const multiplier = activityMultipliers[activity as keyof typeof activityMultipliers];
    return Math.round(bmr * multiplier);
  };
  
  const fitnessCards = [
    {
      title: "Regular Exercise",
      description: "Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity each week.",
    },
    {
      title: "Strength Training",
      description: "Include muscle-strengthening activities at least 2 days a week.",
    },
    {
      title: "Sleep Well",
      description: "Adults should aim for 7-9 hours of quality sleep per night.",
    },
    {
      title: "Stress Management",
      description: "Practice stress-reduction techniques like meditation, deep breathing, or yoga.",
    },
    {
      title: "Regular Health Check-ups",
      description: "Schedule routine medical check-ups and preventive screenings.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 transition-all duration-300">
        <section className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-healthcare-700 dark:text-healthcare-100">
            Health & Fitness Maintenance
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Personalized recommendations to help you maintain optimal health and fitness.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Water Intake Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-medium">Hydration</CardTitle>
                <Droplets className="h-6 w-6 text-healthcare-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-healthcare-600">{calculateWaterIntake()} L</div>
                <p className="text-sm text-muted-foreground mt-1">Recommended daily water intake</p>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Tips to stay hydrated:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Carry a reusable water bottle</li>
                    <li>Set reminders to drink water</li>
                    <li>Consume water-rich foods (fruits, vegetables)</li>
                    <li>Drink a glass of water before meals</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            {/* Caloric Intake Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-medium">Nutrition</CardTitle>
                <Utensils className="h-6 w-6 text-healthcare-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-healthcare-600">{calculateCalories()} kcal</div>
                <p className="text-sm text-muted-foreground mt-1">Estimated daily caloric needs</p>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Nutrition guidelines:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Focus on whole, unprocessed foods</li>
                    <li>Include plenty of fruits and vegetables</li>
                    <li>Choose lean protein sources</li>
                    <li>Limit added sugars and saturated fats</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            {/* Activity Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-medium">Activity</CardTitle>
                <Activity className="h-6 w-6 text-healthcare-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-healthcare-600">150+ min</div>
                <p className="text-sm text-muted-foreground mt-1">Weekly moderate activity goal</p>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Exercise recommendations:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Mix cardio and strength training</li>
                    <li>Find activities you enjoy</li>
                    <li>Start slow and gradually increase</li>
                    <li>Include flexibility exercises</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h3 className="text-2xl font-bold mt-12 mb-6 text-healthcare-700 dark:text-healthcare-100">
            General Fitness Tips
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fitnessCards.map((card, index) => (
              <Card key={index} className="bg-healthcare-50 dark:bg-healthcare-800/50 border-healthcare-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-healthcare-700 dark:text-healthcare-200">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <p className="mb-4 text-healthcare-600">Want personalized recommendations?</p>
            <Button 
              className="bg-healthcare-500 hover:bg-healthcare-600" 
              onClick={() => toast({
                title: "Coming Soon",
                description: "Personalized fitness plans will be available in a future update!",
              })}
            >
              Create Personalized Plan
            </Button>
          </div>
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

export default HealthFitness;
