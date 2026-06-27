export function getTodayDateString() {
  return new Date().toISOString().split('T')[0];
}

export function getDateDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

export function isBefore(date1, date2) {
  return date1 < date2;
}