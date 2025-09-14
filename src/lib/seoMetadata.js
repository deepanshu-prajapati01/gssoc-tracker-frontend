import constantSEO from "./constantSEO";


// ✅ Complete SEO Metadata
export const metadata = {
    metadataBase: new URL(constantSEO.baseUrl),

    // General info
    applicationName: constantSEO.applicationName,
    generator: "Next.js",
    category: "Technology",

    // 👤 Author & Publisher Information
    authors: [
        {
            name: "Deepanshu Prajapati",
            url: "https://www.linkedin.com/in/deepanshu-prajapati01/"
        }
    ],
    publisher: "Deepanshu Prajapati",

    // Title & Description
    title: {
        default: constantSEO.title,
        template: "%s | GSSoC Tracker"
    },
    description: constantSEO.description,
    keywords: constantSEO.keywords,
    alternates: {
        canonical: constantSEO.baseUrl,
    },

    // Icons & PWA
    manifest: "/site.webmanifest",
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
            { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
        ],
        apple: "/apple-touch-icon.png",
    },

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
        title: constantSEO.title,
        description: constantSEO.description,
        url: constantSEO.baseUrl,
        siteName: constantSEO.applicationName,
        locale: 'en_US',
        type: 'website',
        // images: [
        //     {
        //         url: SiteAssets.SEO_Home,
        //         width: 1200,
        //         height: 630,
        //         alt: constantSEO.applicationName,
        //     }
        // ],
    },

    // Twitter Card
    twitter: {
        card: 'summary_large_image',
        title: constantSEO.title,
        description: constantSEO.description,
        // images: [
        //     {
        //         url: SiteAssets.SEO_Home,
        //         width: 1200,
        //         height: 630,
        //         alt: constantSEO.applicationName,
        //     }
        // ],
    },

    // Robots & Crawling
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Google Search Console Verification
    verification: {
        google: constantSEO.googleSearchConsoleVerificationToken
    },
};
