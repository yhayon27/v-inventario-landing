import type { ElementType } from "react";

export interface Mod {
  id: string;
  icon: ElementType;
  name: string;
  description: string;
  on?: boolean;
}

export interface Message {
  id: number;
  from: "user" | "ai";
  text: string;
  delay: number;
}
