export const localizedNumber = (
  amount: number,
  locale = "en-US",
  options?: Intl.NumberFormatOptions
) => {
  return new Intl.NumberFormat(locale, options).format(amount);
};
