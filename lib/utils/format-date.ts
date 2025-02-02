export function formatDate(input: {
  date: string | number,
  locales?: Intl.LocalesArgument, 
  options?: Intl.DateTimeFormatOptions
}) {
  const { date, locales = "en-US", options = {} } = input;
  const dateObj = new Date(date);

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

  // Mescla as opções padrão com as passadas pelo usuário
  const finalOptions = { ...defaultOptions, ...options };

  return dateObj.toLocaleString(locales, finalOptions);
}
