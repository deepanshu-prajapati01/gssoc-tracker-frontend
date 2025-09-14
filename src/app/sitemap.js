// app/sitemap.js

import constantSEO from "@/lib/constantSEO";

export const metadata = {
    title: 'Sitemap',
};

export default async function sitemap() {
    const baseUrl = constantSEO.baseUrl;
    const lastMod = new Date().toISOString();

    return [
        // Homepage - Highest priority
        {
            url: baseUrl,
            lastModified: lastMod,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        // Dashboard - High priority
        {
            url: `${baseUrl}/dashboard`,
            lastModified: lastMod,
            changeFrequency: 'always',
            priority: 0.9,
        },
        // Leaderboard - High priority
        {
            url: `${baseUrl}/leaderboard`,
            lastModified: lastMod,
            changeFrequency: 'hourly',
            priority: 0.9,
        },
        // Projects - Medium priority
        {
            url: `${baseUrl}/projects`,
            lastModified: lastMod,
            changeFrequency: 'daily',
            priority: 0.7,
        },
        // Badges - Medium priority
        {
            url: `${baseUrl}/badges`,
            lastModified: lastMod,
            changeFrequency: 'daily',
            priority: 0.7,
        }
    ];
}
