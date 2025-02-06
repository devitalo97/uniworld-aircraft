export function formatDate(input: {
  date: string | number | Date,
  locales?: Intl.LocalesArgument, 
  options?: Intl.DateTimeFormatOptions
  callback?: (result: string, dateObj: Date) => string
}) {
  const { date, locales = "en-US", options, callback } = input;
  const dateObj = new Date(date);

  const finalOptions = options ? options : defaultOptions
  const finalDate = dateObj.toLocaleString(locales, finalOptions)
  return callback ? callback(finalDate, dateObj) : finalDate;
}

// Definição de opções padrão
const defaultOptions: Intl.DateTimeFormatOptions = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
  timeZone: "UTC" // Define UTC como padrão
};
