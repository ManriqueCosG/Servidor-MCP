export function contar_palabras({ texto }) {
    const palabras = texto.trim().split(/\s+/).length;
    return `El texto tiene ${palabras} palabras.`;
  }
  