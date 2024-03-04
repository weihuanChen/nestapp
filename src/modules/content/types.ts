export interface PostEntity {
    // 虚拟实体
    id: number;
    title: string;
    summary?: string;
    body: string;
}
export type SearchType = 'mysql';
export interface ContentConfig {
    searchType?: SearchType;
}
