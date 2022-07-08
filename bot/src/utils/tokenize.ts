export function tokenize(text: string, count: number, token: string = ' '): string[] {
  const splited = text.split(token);
  const tokenizedArgs = splited.splice(0, count);
  const remain = splited.join(token);
  return [...tokenizedArgs, remain];
}
