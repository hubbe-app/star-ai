export function getEnviromentVariable(name: string) {
  return process.env[name] || process.env[`NEXT_PUBLIC_${name}`];
}
