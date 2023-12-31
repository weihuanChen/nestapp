import sanitizeHtml from 'sanitize-html';

import { deepMerge } from '@/modules/core/helpers';
// 使用sanitizeHtml 防止xss攻击
export class SanitizeService {
    protected config: sanitizeHtml.IOptions = {};

    constructor() {
        this.config = {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'code']),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                '*': ['class', 'style', 'height', 'width'],
            },
            parser: {
                lowerCaseTags: true,
            },
        };
    }

    sanitize(body: string, options?: sanitizeHtml.IOptions) {
        return sanitizeHtml(body, deepMerge(this.config, options ?? {}, 'replace'));
    }
}
