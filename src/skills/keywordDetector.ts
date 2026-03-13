export interface DetectionResult {
  keyword: string;
  count: number;
  indices: number[];
}

/**
 * Detects special keywords within a given text context.
 * @param text The context string to search within.
 * @param keywords An array of special keywords to detect.
 * @returns An array of DetectionResult objects containing the keyword, count, and starting indices.
 */
export function detectKeywords(text: string, keywords: string[]): DetectionResult[] {
  if (!text || !keywords || keywords.length === 0) return [];

  const results: DetectionResult[] = [];
  const lowerText = text.toLowerCase();

  for (const keyword of keywords) {
    const trimmedKeyword = keyword.trim().toLowerCase();
    if (!trimmedKeyword) continue;

    let count = 0;
    const indices: number[] = [];
    let startIndex = 0;

    while ((startIndex = lowerText.indexOf(trimmedKeyword, startIndex)) > -1) {
      count++;
      indices.push(startIndex);
      startIndex += trimmedKeyword.length;
    }

    if (count > 0) {
      results.push({ keyword: trimmedKeyword, count, indices });
    }
  }

  return results;
}
