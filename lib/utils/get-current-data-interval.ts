export function getCurrentDateInterval() {
    const today = new Date();
  
    const start = today.toISOString().split('T')[0];
  
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const end = tomorrow.toISOString().split('T')[0];
  
    return { start, end };
  }
  