//capitaliza a primeira letra de uma string
export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

//converte uma string para Title Case (primeira letra de cada palavra maiúscula)
export const toTitleCase = (string) => {
  if (!string) return '';
  return string.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });
};

//converte uma string para Sentence Case (apenas a primeira letra da frase maiúscula)
export const toSentenceCase = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

