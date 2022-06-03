interface CapitalizeLetter {
  index: number;
  str: string;
}

export function capitalizer({ index, str }: CapitalizeLetter): string {
  return (
    str.slice(0, index) +
    str.charAt(index).toUpperCase() +
    str.slice(index + 1)
  );
}
