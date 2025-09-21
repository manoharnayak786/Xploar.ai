import { useEffect } from 'react';

const HomePageSEO = () => {
    useEffect(() => {
        // Update document title with AI focus
        document.title = "Xploar.ai - AI Learning Platform & Tutor | UPSC Preparation with AI";

        // Update meta description with AI focus
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Xploar.ai is an advanced AI learning platform and tutor for UPSC preparation. Features AI-powered personalized study plans, adaptive mock tests, AI answer evaluation, voice tutoring, and intelligent progress tracking. Experience the future of education with AI.");
        }

        // Add enhanced keywords meta tag with AI focus
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', "AI learning platform, AI tutor, AI-powered education, UPSC preparation, competitive exam preparation, AI mock tests, AI study planner, AI answer evaluation, AI voice tutor, personalized AI learning, adaptive AI, AI-powered UPSC, AI exam preparation, AI learning tools, artificial intelligence education, AI study assistant, AI-powered learning platform, AI educational technology, AI tutoring system, machine learning education");
        } else {
            const keywordsMeta = document.createElement('meta');
            keywordsMeta.name = 'keywords';
            keywordsMeta.content = 'AI learning platform, AI tutor, AI-powered education, UPSC preparation, competitive exam preparation, AI mock tests, AI study planner, AI answer evaluation, AI voice tutor, personalized AI learning, adaptive AI, AI-powered UPSC, AI exam preparation, AI learning tools, artificial intelligence education, AI study assistant, AI-powered learning platform, AI educational technology, AI tutoring system, machine learning education';
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

        // Add AI-specific meta tags
        const aiCategoryMeta = document.querySelector('meta[name="ai-category"]');
        if (!aiCategoryMeta) {
            const aiCategory = document.createElement('meta');
            aiCategory.name = 'ai-category';
            aiCategory.content = 'Educational AI, Learning AI, Tutoring AI, Assessment AI';
            document.head.appendChild(aiCategory);
        }

        const aiCapabilitiesMeta = document.querySelector('meta[name="ai-capabilities"]');
        if (!aiCapabilitiesMeta) {
            const aiCapabilities = document.createElement('meta');
            aiCapabilities.name = 'ai-capabilities';
            aiCapabilities.content = 'Personalized Learning, Adaptive Testing, Natural Language Processing, Voice Recognition, Answer Evaluation, Progress Analytics';
            document.head.appendChild(aiCapabilities);
        }

        const aiUseCaseMeta = document.querySelector('meta[name="ai-use-case"]');
        if (!aiUseCaseMeta) {
            const aiUseCase = document.createElement('meta');
            aiUseCase.name = 'ai-use-case';
            aiUseCase.content = 'UPSC Preparation, Competitive Exam Training, Personalized Education, AI Tutoring, Study Planning, Mock Testing';
            document.head.appendChild(aiUseCase);
        }

        // Add AI tool classification meta tags
        const toolTypeMeta = document.querySelector('meta[name="tool-type"]');
        if (!toolTypeMeta) {
            const toolType = document.createElement('meta');
            toolType.name = 'tool-type';
            toolType.content = 'AI Learning Platform, Educational AI Tool, AI Tutor, AI Assessment Tool';
            document.head.appendChild(toolType);
        }

        const aiModelMeta = document.querySelector('meta[name="ai-model"]');
        if (!aiModelMeta) {
            const aiModel = document.createElement('meta');
            aiModel.name = 'ai-model';
            aiModel.content = 'Custom AI Models, Natural Language Processing, Machine Learning, Adaptive Learning Algorithms';
            document.head.appendChild(aiModel);
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

        // Update Open Graph tags with AI focus
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', "Xploar.ai - AI Learning Platform & Tutor | UPSC Preparation with AI");
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', "Xploar.ai is an advanced AI learning platform and tutor for UPSC preparation. Features AI-powered personalized study plans, adaptive mock tests, AI answer evaluation, voice tutoring, and intelligent progress tracking. Experience the future of education with AI.");
        }

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            ogUrl.setAttribute('content', "https://xploar.ai/");
        }

        // Update Twitter tags with AI focus
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', "Xploar.ai - AI Learning Platform & Tutor | UPSC Preparation with AI");
        }

        const twitterDescription = document.querySelector('meta[property="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', "Xploar.ai is an advanced AI learning platform and tutor for UPSC preparation. Features AI-powered personalized study plans, adaptive mock tests, AI answer evaluation, voice tutoring, and intelligent progress tracking. Experience the future of education with AI.");
        }

        const twitterUrl = document.querySelector('meta[property="twitter:url"]');
        if (twitterUrl) {
            twitterUrl.setAttribute('content', "https://xploar.ai/");
        }

    }, []);

    return null; // This component doesn't render anything
};

export default HomePageSEO;
