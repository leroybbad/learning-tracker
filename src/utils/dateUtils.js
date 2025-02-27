/**
 * Format a date to a human-readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string (e.g. "Monday, January 1, 2023")
 */
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  /**
   * Check if two dates are the same day
   * @param {Date} date1 - First date
   * @param {Date} date2 - Second date
   * @returns {boolean} True if dates are the same day
   */
  export const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };
  
  /**
   * Get today's date at midnight
   * @returns {Date} Today's date at midnight
   */
  export const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };