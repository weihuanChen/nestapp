import { SelectTrashMode } from '../database/constants';

export interface PostEntity {
    // 虚拟实体
    id: number;
    title: string;
    summary?: string;
    body: string;
}
export type SearchType = 'mysql' | 'meilli';
export interface ContentConfig {
    searchType?: SearchType;
}
export interface SearchOption {
    trashed?: SelectTrashMode;
    isPublished?: boolean;
    page?: number;
    limit?: number;
}
