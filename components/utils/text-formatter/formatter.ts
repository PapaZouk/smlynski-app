export const formatText = (text: string): string => {
  return text.replace(/\\n/g, "</br>")
    .replace(/<b>/g, "<strong>")
    .replace(/<\/b>/g, "</strong>");
};
