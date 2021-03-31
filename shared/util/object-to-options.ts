// export function objectToOptions<K extends string, V extends number>(object: Record<K, V>) {
//   return Object.entries(object).map((item) => ({ label: item[0], value: item[1] }));
// }
type KeyValueReference<K, V> = [K, V];

export function objectToOptions<K extends string, V extends string, O extends Record<any, any>>(
  object: O,
  ...args: KeyValueReference<K, keyof O[keyof O]>[]
): Record<K | V, any>[] {
  return Object.values(object).map((item) =>
    args.reduce((pre, cur) => {
      pre[cur[0]] = item[cur[1]];
      return pre;
    }, {} as any)
  );
}
