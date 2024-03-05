import { MelliConfig } from './type';
/**
 * 判断默认节点是否存在，如果不存在则创建
 * @param config 配置
 */
export const createMeilliOptions = async (
    config: MelliConfig,
): Promise<MelliConfig | undefined> => {
    if (config.length <= 0) return config;
    let options: MelliConfig = [...config];
    const names = options.map(({ name }) => name);
    if (!names.includes('default')) {
        options[0].name = 'default';
    } else if (names.filter((name) => name === 'default').length > 1) {
        options = options.reduce(
            (o, n) => (o.map(({ name }) => name).includes('default') ? o : [...o, n]),
            [],
        );
    }
    return options;
};
