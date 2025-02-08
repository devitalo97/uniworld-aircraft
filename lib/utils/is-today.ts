export function isToday(date: Date, locale: string = "es-PA", timeZone: string = 'America/Panama'): boolean {
    const today = new Date();
  
    const options: Intl.DateTimeFormatOptions = {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
  
    const dateString = date.toLocaleDateString(locale, options);
    const todayString = today.toLocaleDateString(locale, options);
  
    return dateString === todayString;
  }
  