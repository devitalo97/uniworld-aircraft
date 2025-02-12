export function getCurrentDateInterval(days_interval = 1) {
  const today = new Date();

  const start = today.toISOString().split("T")[0];

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + days_interval);
  const end = tomorrow.toISOString().split("T")[0];

  return { start, end };
}

export function getLast7DaysInterval() {
  const today = new Date();
  const end = today.toISOString().split("T")[0];

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const start = sevenDaysAgo.toISOString().split("T")[0];

  return { start, end };
}
