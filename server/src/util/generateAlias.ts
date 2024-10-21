import { EntityKeys } from './filters';

/**
 * helper function to combine alias and keys
 * @param alias entity alias
 * @param keys attributes from entity to be combined
 * @returns {string[]}
 */
export const generateAliases = <T>(
  alias: string,
  keys: EntityKeys<T>[]
): string[] => {
  return keys.map((key) => `${alias}.${String(key)}`);
};
