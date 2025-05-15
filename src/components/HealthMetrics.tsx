
import { Card } from "@/components/ui/card";

interface HealthMetricProps {
  title: string;
  value: string;
  unit: string;
  status?: "normal" | "warning" | "alert";
  icon?: React.ReactNode;
}

const HealthMetric = ({ title, value, unit, status = "normal", icon }: HealthMetricProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "warning":
        return "text-amber-500";
      case "alert":
        return "text-red-500";
      default:
        return "text-green-500";
    }
  };

  return (
    <Card className="p-4 flex flex-col items-center">
      <div className="flex items-center justify-center mb-2">
        {icon && <div className="mr-2">{icon}</div>}
        <h3 className="text-healthcare-700 dark:text-healthcare-100 font-medium">{title}</h3>
      </div>
      <div className="flex items-end">
        <span className={`text-2xl font-bold ${getStatusColor()}`}>{value}</span>
        <span className="text-sm text-gray-500 ml-1">{unit}</span>
      </div>
    </Card>
  );
};

export function HealthMetrics() {
  // This would typically come from an API or user profile
  const mockHealthData = {
    heartRate: { value: "72", unit: "BPM", status: "normal" },
    bloodSugar: { value: "95", unit: "mg/dL", status: "normal" },
    bloodPressure: { value: "120/80", unit: "mmHg", status: "normal" },
    oxygenLevel: { value: "98", unit: "%", status: "normal" },
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <HealthMetric 
        title="Heart Rate" 
        value={mockHealthData.heartRate.value} 
        unit={mockHealthData.heartRate.unit} 
        status={mockHealthData.heartRate.status as any}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-healthcare-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        }
      />
      <HealthMetric 
        title="Blood Sugar" 
        value={mockHealthData.bloodSugar.value} 
        unit={mockHealthData.bloodSugar.unit} 
        status={mockHealthData.bloodSugar.status as any}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-healthcare-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v6m0 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            <path d="M12 12v10"/>
          </svg>
        }
      />
      <HealthMetric 
        title="Blood Pressure" 
        value={mockHealthData.bloodPressure.value} 
        unit={mockHealthData.bloodPressure.unit} 
        status={mockHealthData.bloodPressure.status as any}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-healthcare-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M2 12h20"/>
          </svg>
        }
      />
      <HealthMetric 
        title="Oxygen Level" 
        value={mockHealthData.oxygenLevel.value} 
        unit={mockHealthData.oxygenLevel.unit} 
        status={mockHealthData.oxygenLevel.status as any}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-healthcare-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8M12 8v8"/>
          </svg>
        }
      />
    </div>
  );
}
