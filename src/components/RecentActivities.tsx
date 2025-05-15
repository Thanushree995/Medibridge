
import { Card } from "@/components/ui/card";

interface RecentSymptomProps {
  symptom: string;
  date: string;
  severity: "mild" | "moderate" | "severe";
}

const RecentSymptom = ({ symptom, date, severity }: RecentSymptomProps) => {
  const getSeverityColor = () => {
    switch (severity) {
      case "severe":
        return "bg-red-100 text-red-800";
      case "moderate":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border-b last:border-0">
      <div className="flex flex-col">
        <span className="font-medium">{symptom}</span>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor()}`}>
        {severity}
      </span>
    </div>
  );
};

interface AppointmentProps {
  doctor: string;
  specialty: string;
  date: string;
  time: string;
}

const Appointment = ({ doctor, specialty, date, time }: AppointmentProps) => {
  return (
    <div className="flex items-center justify-between p-3 border-b last:border-0">
      <div className="flex flex-col">
        <span className="font-medium">{doctor}</span>
        <span className="text-sm text-gray-500">{specialty}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-medium">{date}</span>
        <span className="text-sm text-gray-500">{time}</span>
      </div>
    </div>
  );
};

export function RecentActivities() {
  // Mock data - would typically come from an API
  const symptoms = [
    { symptom: "Headache", date: "Today, 10:30 AM", severity: "mild" as const },
    { symptom: "Fever", date: "Yesterday, 8:15 PM", severity: "moderate" as const },
  ];

  const appointments = [
    { doctor: "Dr. Smith", specialty: "Cardiologist", date: "May 5, 2025", time: "10:00 AM" },
    { doctor: "Dr. Johnson", specialty: "Neurologist", date: "May 12, 2025", time: "2:30 PM" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <Card className="overflow-hidden">
        <div className="bg-healthcare-500 text-white p-3">
          <h3 className="font-medium">Recent Symptoms</h3>
        </div>
        <div className="divide-y">
          {symptoms.map((item, i) => (
            <RecentSymptom
              key={i}
              symptom={item.symptom}
              date={item.date}
              severity={item.severity}
            />
          ))}
        </div>
      </Card>
      
      <Card className="overflow-hidden">
        <div className="bg-healthcare-500 text-white p-3">
          <h3 className="font-medium">Upcoming Appointments</h3>
        </div>
        <div className="divide-y">
          {appointments.map((item, i) => (
            <Appointment
              key={i}
              doctor={item.doctor}
              specialty={item.specialty}
              date={item.date}
              time={item.time}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
