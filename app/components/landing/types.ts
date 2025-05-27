import { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  colorScheme: {
    border: string;
    background: string;
    iconBg: string;
    iconColor: string;
    titleColor: string;
  };
}

export interface AboutCard {
  icon: LucideIcon;
  title: string;
  description: string;
  colorScheme: {
    border: string;
    background: string;
    iconBg: string;
    iconColor: string;
    titleColor: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}
