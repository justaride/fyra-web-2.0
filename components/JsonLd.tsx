interface JsonLdProps {
    data: Record<string, unknown>;
}

/**
 * Sanitizes JSON-LD data to prevent XSS attacks
 * Escapes < and > characters that could break out of script tags
 */
function sanitizeJsonLd(data: Record<string, unknown>): string {
    return JSON.stringify(data)
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e')
        .replace(/&/g, '\\u0026');
}

export function JsonLd({ data }: JsonLdProps) {
    const safeData = sanitizeJsonLd(data);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeData }}
        />
    );
}

// Helper functions to generate common JSON-LD structures

export function generateOrganizationSchema(org: {
    name: string;
    url?: string;
    email?: string;
    phone?: string;
    address?: {
        locality?: string;
        region?: string;
        country?: string;
    };
    description?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: org.name,
        ...(org.url && { url: org.url }),
        ...(org.description && { description: org.description }),
        ...(org.email && { email: org.email }),
        ...(org.phone && { telephone: org.phone }),
        ...(org.address && {
            address: {
                '@type': 'PostalAddress',
                ...(org.address.locality && { addressLocality: org.address.locality }),
                ...(org.address.region && { addressRegion: org.address.region }),
                ...(org.address.country && { addressCountry: org.address.country }),
            },
        }),
    };
}

export function generateLocalBusinessSchema(business: {
    name: string;
    description?: string;
    url?: string;
    email?: string;
    phone?: string;
    address?: {
        locality?: string;
        region?: string;
        country?: string;
    };
    priceRange?: string;
    services?: string[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: business.name,
        ...(business.description && { description: business.description }),
        ...(business.url && { url: business.url }),
        ...(business.email && { email: business.email }),
        ...(business.phone && { telephone: business.phone }),
        ...(business.priceRange && { priceRange: business.priceRange }),
        ...(business.address && {
            address: {
                '@type': 'PostalAddress',
                ...(business.address.locality && { addressLocality: business.address.locality }),
                ...(business.address.region && { addressRegion: business.address.region }),
                ...(business.address.country && { addressCountry: business.address.country }),
            },
        }),
        ...(business.services && {
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Services',
                itemListElement: business.services.map((service, idx) => ({
                    '@type': 'Offer',
                    '@id': `#service-${idx}`,
                    itemOffered: {
                        '@type': 'Service',
                        name: service,
                    },
                })),
            },
        }),
    };
}

export function generateArticleSchema(article: {
    headline: string;
    description?: string;
    datePublished?: string;
    dateModified?: string;
    author?: string;
    image?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.headline,
        ...(article.description && { description: article.description }),
        ...(article.datePublished && { datePublished: article.datePublished }),
        ...(article.dateModified && { dateModified: article.dateModified }),
        ...(article.author && {
            author: {
                '@type': 'Organization',
                name: article.author,
            },
        }),
        ...(article.image && { image: article.image }),
    };
}

export function generateHowToSchema(howTo: {
    name: string;
    description?: string;
    steps: { name: string; text: string }[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: howTo.name,
        ...(howTo.description && { description: howTo.description }),
        step: howTo.steps.map((step, idx) => ({
            '@type': 'HowToStep',
            position: idx + 1,
            name: step.name,
            text: step.text,
        })),
    };
}

export function generateWebPageSchema(page: {
    name: string;
    description?: string;
    url?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.name,
        ...(page.description && { description: page.description }),
        ...(page.url && { url: page.url }),
        publisher: {
            '@type': 'Organization',
            name: 'Fyra Circular Platform',
            url: 'https://fyra.no',
        },
    };
}
