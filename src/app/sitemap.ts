import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = getBaseUrl();
    return [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/builder`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];
}

function getBaseUrl(): string {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (baseUrl) return baseUrl.replace(/\/$/, '');
    return 'http://localhost:3000';
}
