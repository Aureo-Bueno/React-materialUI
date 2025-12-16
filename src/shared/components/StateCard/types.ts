import { ReactNode } from "react";

export interface IStatCardProps {
  title: string;
  value?: number;
  isLoading: boolean;
  error?: Error | null;
  icon?: ReactNode;
}
