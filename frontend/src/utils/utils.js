export const toLetterAbbr = (num) =>
  num <= 0 ? '' : toLetterAbbr(Math.floor((num - 1) / 26)) + String.fromCharCode(((num - 1) % 26) + 65);

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
