export function isString(value: unknown): value is String {
  return typeof value === "string";
}
