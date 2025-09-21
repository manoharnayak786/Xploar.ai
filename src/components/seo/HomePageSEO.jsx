import { useEffect } from 'react';

const HomePageSEO = () => {
    useEffect(() => {
        // Update document title with enhanced keywords
        document.title = "Xploar.ai - AI-Powered UPSC Preparation Platform | Crack Exams in 100 Days";

        // Update meta description with better keyword targeting
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Master UPSC & competitive exams with Xploar.ai's AI-powered learning platform. Get personalized study plans, mock tests, answer evaluation & voice tutoring. Start your 100-day journey to success.");
        }

        // Add enhanced keywords meta tag
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', "UPSC preparation, AI learning platform, competitive exam preparation, mock tests, study planner, answer evaluation, voice tutor, current affairs, personalized learning, adaptive AI, exam preparation, civil services, IAS preparation, online learning, AI tutor");
        } else {
            const keywordsMeta = document.createElement('meta');
            keywordsMeta.name = 'keywords';
            keywordsMeta.content = 'UPSC preparation, AI learning platform, competitive exam preparation, mock tests, study planner, answer evaluation, voice tutor, current affairs, personalized learning, adaptive AI, exam preparation, civil services, IAS preparation, online learning, AI tutor';
            document.head.appendChild(keywordsMeta);
        }

        // Add author meta tag
        const authorMeta = document.querySelector('meta[name="author"]');
        if (!authorMeta) {
            const author = document.createElement('meta');
            author.name = 'author';
            author.content = 'Xploar.ai Team';
            document.head.appendChild(author);
        }

        // Add robots meta tag
        const robotsMeta = document.querySelector('meta[name="robots"]');
        if (!robotsMeta) {
            const robots = document.createElement('meta');
            robots.name = 'robots';
            robots.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
            document.head.appendChild(robots);
        }

        // Update canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', "https://xploar.ai/");
        }

        // Enhanced structured data with multiple schemas
        const structuredData = [
            {
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                "name": "Xploar.ai",
                "alternateName": "Xploar AI",
                "description": "AI-powered learning platform that empowers learners worldwide to explore, personalize, and master knowledge through adaptive AI tools.",
                "url": "https://xploar.ai",
                "logo": "https://xploar.ai/logo-xploar.svg",
                "image": "https://xploar.ai/og-image.jpg",
                "sameAs": [
                    "https://twitter.com/xploarai",
                    "https://linkedin.com/company/xploar-ai",
                    "https://facebook.com/xploarai"
                ],
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Hyderabad",
                    "addressRegion": "Telangana",
                    "addressCountry": "IN"
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer service",
                    "email": "support@xploar.ai",
                    "availableLanguage": ["English", "Hindi"]
                },
                "offers": {
                    "@type": "Offer",
                    "description": "AI-powered learning platform with personalized education tools",
                    "category": "Educational Technology",
                    "price": "0",
                    "priceCurrency": "INR"
                },
                "foundingDate": "2024",
                "slogan": "Where Curiosity Meets Clarity",
                "knowsAbout": [
                    "AI-powered learning",
                    "UPSC preparation",
                    "Personalized education",
                    "Adaptive learning",
                    "Competitive exam preparation"
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Xploar.ai",
                "url": "https://xploar.ai",
                "description": "AI-powered learning platform for UPSC preparation and competitive exams",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://xploar.ai/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Xploar.ai",
                    "logo": "https://xploar.ai/logo-xploar.svg"
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Xploar.ai Learning Platform",
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web Browser",
                "description": "AI-powered learning platform for UPSC preparation and competitive exams",
                "url": "https://xploar.ai",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "150"
                },
                "featureList": [
                    "AI-powered mock tests",
                    "Personalized study plans",
                    "Answer evaluation",
                    "Voice tutoring",
                    "Current affairs updates",
                    "Progress tracking"
                ]
            }
        ];

        // Remove existing structured data
        const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
        existingScripts.forEach(script => script.remove());

        // Add multiple structured data schemas
        structuredData.forEach((schema, index) => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(schema);
            script.id = `structured-data-${index}`;
            document.head.appendChild(script);
        });

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', "Xploar.ai - AI-Powered UPSC Preparation Platform | Crack Exams in 100 Days");
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', "Master UPSC & competitive exams with Xploar.ai's AI-powered learning platform. Get personalized study plans, mock tests, answer evaluation & voice tutoring. Start your 100-day journey to success.");
        }

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            ogUrl.setAttribute('content', "https://xploar.ai/");
        }

        // Update Twitter tags
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', "Xploar.ai - AI-Powered UPSC Preparation Platform | Crack Exams in 100 Days");
        }

        const twitterDescription = document.querySelector('meta[property="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', "Master UPSC & competitive exams with Xploar.ai's AI-powered learning platform. Get personalized study plans, mock tests, answer evaluation & voice tutoring. Start your 100-day journey to success.");
        }

        const twitterUrl = document.querySelector('meta[property="twitter:url"]');
        if (twitterUrl) {
            twitterUrl.setAttribute('content', "https://xploar.ai/");
        }

    }, []);

    return null; // This component doesn't render anything
};

export default HomePageSEO;
