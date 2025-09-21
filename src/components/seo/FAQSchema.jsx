import { useEffect } from 'react';

const FAQSchema = () => {
    useEffect(() => {
        const faqData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What is Xploar.ai and how does it help with UPSC preparation?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Xploar.ai is an AI-powered learning platform specifically designed for UPSC and competitive exam preparation. It provides personalized study plans, AI-powered mock tests, answer evaluation, voice tutoring, and current affairs updates to help aspirants crack exams in just 100 days."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How does the AI-powered study planner work?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our AI study planner analyzes your learning patterns, strengths, and weaknesses to create personalized daily study schedules. It adapts to your progress, provides auto-revision schedules, and ensures optimal time management for comprehensive UPSC preparation."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What makes Xploar.ai's mock tests different from others?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Xploar.ai offers adaptive mock tests that adjust difficulty based on your performance. Our AI analyzes your answers in real-time, provides instant analytics, and offers personalized feedback to improve your exam strategy and performance."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How does the AI answer evaluation system work?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our AI answer evaluator scores your written answers based on structure, relevance, depth, and examples. It provides detailed feedback on content quality, suggests improvements, and helps you develop better answer writing skills for UPSC mains."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can I use Xploar.ai for other competitive exams besides UPSC?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, Xploar.ai is designed for various competitive exams including UPSC, state PSC exams, banking, SSC, and other government job preparations. Our AI adapts to different exam patterns and requirements."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How does the voice tutor feature work?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our voice tutor allows you to ask doubts hands-free using natural language. The AI provides crisp, cited explanations and can engage in interactive learning sessions to clarify concepts and answer your questions instantly."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is Xploar.ai suitable for beginners in UPSC preparation?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Absolutely! Xploar.ai is designed for learners at all levels. Our AI creates foundational learning paths for beginners, gradually building complexity. The platform provides step-by-step guidance, basic concept explanations, and progressive skill development."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How accurate is the current affairs nano-feed?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our current affairs nano-feed is curated by AI to provide condensed, exam-ready updates with recall checks. It focuses on relevant topics for competitive exams, eliminates noise, and ensures you stay updated with the most important current events."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can I track my progress on Xploar.ai?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, Xploar.ai provides comprehensive progress tracking with clear tasks, streaks, and progress percentages. You can monitor your performance across different subjects, track improvement over time, and get insights into your learning journey."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the pricing for Xploar.ai services?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Xploar.ai offers flexible pricing plans to suit different needs. We provide both free and premium features. Contact our support team for detailed pricing information and to find the plan that best fits your preparation requirements."
                    }
                }
            ]
        };

        // Remove existing FAQ structured data
        const existingFAQScript = document.querySelector('script[id="faq-structured-data"]');
        if (existingFAQScript) {
            existingFAQScript.remove();
        }

        // Add FAQ structured data
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(faqData);
        script.id = 'faq-structured-data';
        document.head.appendChild(script);

        return () => {
            // Cleanup on unmount
            const scriptToRemove = document.querySelector('script[id="faq-structured-data"]');
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, []);

    return null; // This component doesn't render anything
};

export default FAQSchema;
