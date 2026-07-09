export function formatCurrency(value: number): string {
  const rounded = Math.round(value);
  return `${rounded.toLocaleString('ko-KR')}원`;
}

export function formatCups(value: number): string {
  return `${Math.ceil(value).toLocaleString('ko-KR')}잔`;
}
