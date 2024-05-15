export function extractTime(inputString: string): string {
  // Split the input string by space
  const parts: string[] = inputString.split(" ");
  // Return the last part which represents the time
  return parts[parts.length - 1];
}


