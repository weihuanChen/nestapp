import deepmerge from 'deepmerge';
import { isNil } from 'lodash';

/**
 * boolean 转义
 * @param v
 */
export function toBoolean(v?: string | boolean): boolean {
    if (isNil(v)) {
        return false;
    }
    if (typeof v === 'boolean') {
        return v;
    }
    try {
        return JSON.parse(v.toLowerCase());
    } catch (error) {
        return v as unknown as boolean;
    }
}

/**
 * 转义null
 * @param v
 */
export function toNull(v?: string | null): string | null | undefined {
    return v === null ? null : v;
}
/**
 * 深度合并
 */
export const deepMerge = <T1, T2>(
    x: Partial<T1>,
    y: Partial<T2>,
    arrayMode: 'replace' | 'merge' = 'merge',
) => {
    const options: deepmerge.Options = {};
    if (arrayMode === 'replace') {
        options.arrayMerge = (_d, s, _o) => s;
    } else if (arrayMode === 'merge') {
        options.arrayMerge = (_d, s, _o) => Array.from(new Set([..._d, ...s]));
    }
    return deepmerge(x, y, options) as T2 extends T1 ? T1 : T1 & T2;
};
