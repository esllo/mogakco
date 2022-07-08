export function int2hexColor(color: number) {
  const hex = '#' + color.toString(16).padStart(6, '0');
  return hex;
}
