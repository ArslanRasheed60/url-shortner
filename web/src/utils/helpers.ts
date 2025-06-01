/**
 * Helper utility functions for the URL Shortener application
 */

/**
 * Formats a date string into a readable format
 * @param dateString - ISO date string to format
 * @param includeTime - Whether to include time in the formatted date
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, includeTime = false): string => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return 'Invalid Date';
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(includeTime ? { hour: '2-digit', minute: '2-digit' } : {})
  };
  
  return date.toLocaleDateString('en-US', options);
};

/**
 * Validates if a string is a valid URL
 * @param url - URL string to validate
 * @returns Boolean indicating if URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Copies text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copying is done or rejects with error
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    throw new Error('Failed to copy to clipboard');
  }
};

/**
 * Truncates text to a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Generates a full short URL based on the short code
 * @param shortCode - The short code part of the URL
 * @returns Full URL including origin and path
 */
export const getFullShortUrl = (shortCode: string): string => {
  if (!shortCode) return '';
  return `${window.location.origin}/s/${shortCode}`;
};

/**
 * Extracts domain from a URL
 * @param url - URL to extract domain from
 * @returns Domain name or empty string if invalid
 */
export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (err) {
    return '';
  }
};
