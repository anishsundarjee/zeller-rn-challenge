export const getValidString = (s?: string) => {
  if (!s) return '';
  const regex = /[^-a-zA-Z ]+/g;
  return s.replace(regex, '');
};