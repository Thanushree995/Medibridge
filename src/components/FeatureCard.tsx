
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

export function FeatureCard({ icon, title, description, onClick, className }: FeatureCardProps) {
  return (
    <Card 
      className={cn("feature-button cursor-pointer", className)} 
      onClick={onClick}
    >
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </Card>
  );
}
