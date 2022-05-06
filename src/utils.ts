export function range(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}
export function randomInt(min: number, max: number): number {
  return (min + Math.random() * (max - min)) | 0;
}

export function assertNever(x: never): never {
  throw new Error("Unexpected value. Should have been never.");
}

export function classes(...classes: string[]): string {
  return classes.join(" ");
}
