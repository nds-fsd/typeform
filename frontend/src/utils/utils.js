export const toLetterAbbr = (num) =>
  num <= 0 ? '' : toLetterAbbr(Math.floor((num - 1) / 26)) + String.fromCharCode(((num - 1) % 26) + 65);

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const emptyWorkspaceMessage = 'No forms available';

export function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
