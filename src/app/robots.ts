import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${getBaseUrl()}/sitemap.xml`,
    };
}

function getBaseUrl(): string {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (baseUrl) return baseUrl.replace(/\/$/, '');
    return 'http://localhost:3000';
}
