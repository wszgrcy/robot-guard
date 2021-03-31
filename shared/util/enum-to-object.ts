// export function enumToObject<T>(e: T): { [key in Extract<keyof T, string>]: T[key] } {
//   const copy: Record<string | number, string | number> = Object.assign({}, e);
//   Object.values(e).forEach((value) => typeof value === "number" && delete copy[value]);
//   return copy as any;
// }
;