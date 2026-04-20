export const localizeCurrency = (amount: number | null, locale: string) => {
  if (!amount && amount !== 0) {
    return "--";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};
