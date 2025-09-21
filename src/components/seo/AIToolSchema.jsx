import { useEffect } from 'react';

const AIToolSchema = () => {
    useEffect(() => {
        const aiToolData = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Xploar.ai - AI Learning Platform",
            "alternateName": "Xploar AI Tutor",
            "description": "AI-powered learning platform for UPSC preparation and competitive exams with personalized study plans, mock tests, answer evaluation, and voice tutoring.",
            "url": "https://xploar.ai",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web Browser",
            "browserRequirements": "Requires JavaScript. Requires HTML5.",
            "softwareVersion": "2.0",
            "datePublished": "2024-01-01",
            "dateModified": "2024-12-21",
            "author": {
                "@type": "Organization",
                "name": "Xploar.ai",
                "url": "https://xploar.ai"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Xploar.ai",
                "url": "https://xploar.ai",
                "logo": "https://xploar.ai/logo-xploar.svg"
            },
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150",
                "bestRating": "5",
                "worstRating": "1"
            },
            "featureList": [
                "AI-powered personalized study plans",
                "Adaptive mock tests with instant analytics",
                "AI answer evaluation and feedback",
                "Voice-based tutoring and doubt resolution",
                "Current affairs nano-feed with AI curation",
                "Progress tracking and performance analytics",
                "UPSC preparation roadmap",
                "Competitive exam preparation",
                "Real-time learning adaptation",
                "Multilingual support (English, Hindi)"
            ],
            "screenshot": "https://xploar.ai/screenshot.jpg",
            "softwareRequirements": "Web browser with JavaScript enabled",
            "memoryRequirements": "Minimum 2GB RAM",
            "storageRequirements": "No local storage required",
            "permissions": "Microphone access for voice tutor feature",
            "isAccessibleForFree": true,
            "keywords": [
                "AI learning platform",
                "UPSC preparation",
                "AI tutor",
                "personalized education",
                "adaptive learning",
                "competitive exam preparation",
                "AI mock tests",
                "voice tutoring",
                "answer evaluation",
                "study planner",
                "current affairs",
                "AI-powered learning"
            ],
            "audience": {
                "@type": "Audience",
                "audienceType": "UPSC aspirants, competitive exam students, learners"
            },
            "educationalUse": "Learning",
            "learningResourceType": "Interactive Learning Platform",
            "interactivityType": "Active",
            "educationalLevel": "Advanced",
            "typicalAgeRange": "18-35",
            "timeRequired": "P1H",
            "educationalAlignment": {
                "@type": "AlignmentObject",
                "alignmentType": "teaches",
                "educationalFramework": "UPSC Civil Services Examination",
                "targetName": "UPSC Preparation",
                "targetUrl": "https://upsc.gov.in/"
            },
            "teaches": [
                "UPSC Civil Services Preparation",
                "General Studies",
                "Current Affairs",
                "Answer Writing",
                "Exam Strategy",
                "Time Management",
                "Study Planning"
            ],
            "competencyRequired": "Basic understanding of competitive exams",
            "accessibilityFeature": [
                "alternativeText",
                "audioDescription",
                "captions",
                "highContrastDisplay",
                "keyboardNavigation",
                "largePrint",
                "screenReader"
            ],
            "accessibilityHazard": "none",
            "accessibilityAPI": "ARIA",
            "accessibilityControl": [
                "fullKeyboardControl",
                "fullMouseControl",
                "fullTouchControl"
            ]
        };

        // Remove existing AI tool structured data
        const existingAIScript = document.querySelector('script[id="ai-tool-structured-data"]');
        if (existingAIScript) {
            existingAIScript.remove();
        }

        // Add AI tool structured data
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(aiToolData);
        script.id = 'ai-tool-structured-data';
        document.head.appendChild(script);

        return () => {
            // Cleanup on unmount
            const scriptToRemove = document.querySelector('script[id="ai-tool-structured-data"]');
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, []);

    return null; // This component doesn't render anything
};

export default AIToolSchema;
