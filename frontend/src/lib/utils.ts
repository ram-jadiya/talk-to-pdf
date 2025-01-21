import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatEmail = (email: string) => {
  const [localPart, domain] = email.split('@');
  return `${localPart.slice(0, 2)}...@${domain}`;
};