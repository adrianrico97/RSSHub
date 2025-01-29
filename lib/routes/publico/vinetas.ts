import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';

import getItems from './items-processor';

export const route: Route = {
    path: '/opinion/vinetas',
    categories: ['traditional-media'],
    example: '/opinion/vinetas',
    features: {
        requireConfig: false,
        requirePuppeteer: true,
        antiCrawler: false,
        supportBT: false,
        supportPodcast: false,
        supportScihub: false,
    },
    radar: [
        {
            source: ['publico.es/opinion/vinetas'],
            target: '/opinion/vinetas',
        },
    ],
    name: 'Viñetas | Opinión | Público',
    maintainers: ['adrianrico97'],
    handler,
};

async function handler() {
    const rootUrl = 'https://www.publico.es';
    const currentUrl = `${rootUrl}/opinion/vinetas`;

    const response = await got({
        method: 'get',
        url: currentUrl,
    });

    const $ = load(response.data);

    const items = getItems($);

    return {
        title: 'Viñetas | Opinión | Público',
        link: currentUrl,
        item: items,
    };
}
