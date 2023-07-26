import { useEffect, useState } from "react";
import type { StackInfo } from "./use-record"

export interface Automation {
  info: StackInfo;
  steps: AutomationSteps[];
}

export type AutomationSteps = string;

export const useAutomations = () => {
  const [automations, setAutomations] = useState<Automation[]>([]);

  useEffect(() => {
    const automations = JSON.parse(localStorage.getItem('automations') || '[]');
    setAutomations(automations);
  }, []);

  useEffect(() => {
    localStorage.setItem('automations', JSON.stringify(automations));
  }, [automations]);

  return {
    automations,
    setAutomations,
  }
}