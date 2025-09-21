import React, { useState, useRef, useEffect } from 'react';
import { synthesizeSpeech } from '../../lib/elevenlabs';
import { createTask } from '../../lib/clickup';

const VoiceCallButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [queryType, setQueryType] = useState(null);
  const [response, setResponse] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        handleQueryClassification(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setIsProcessing(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      console.warn('Speech recognition not supported in this browser');
    }
  }, []);

  const handleQueryClassification = async (transcript) => {
    setIsProcessing(true);
    
    // Classify query type based on keywords
    const lowerTranscript = transcript.toLowerCase();
    let detectedType = 'general';
    
    if (lowerTranscript.includes('invest') || lowerTranscript.includes('funding') || 
        lowerTranscript.includes('investor') || lowerTranscript.includes('partnership') ||
        lowerTranscript.includes('investment') || lowerTranscript.includes('fund')) {
      detectedType = 'investor';
    } else if (lowerTranscript.includes('stakeholder') || lowerTranscript.includes('business') || 
               lowerTranscript.includes('collaboration') || lowerTranscript.includes('enterprise') ||
               lowerTranscript.includes('partner') || lowerTranscript.includes('corporate')) {
      detectedType = 'stakeholder';
    } else if (lowerTranscript.includes('support') || lowerTranscript.includes('help') || 
               lowerTranscript.includes('issue') || lowerTranscript.includes('problem') ||
               lowerTranscript.includes('bug') || lowerTranscript.includes('error')) {
      detectedType = 'support';
    }
    
    setQueryType(detectedType);
    
    // Generate AI response based on query type
    const aiResponse = generateAIResponse(transcript, detectedType);
    setResponse(aiResponse);
    
    // Convert response to speech using ElevenLabs
    await convertToSpeech(aiResponse);
    
    setIsProcessing(false);
  };

  const generateAIResponse = (transcript, type) => {
    const responses = {
      investor: `Thank you for your interest in Xploar.ai! I understand you're interested in investment opportunities. I'll connect you directly with our team for detailed discussions about our growth plans, market potential, and investment terms. Let me route this to our investor relations team.`,
      stakeholder: `I appreciate your interest in partnering with Xploar.ai! Whether it's educational partnerships, technology collaborations, or business development, I'll ensure our stakeholder relations team reaches out to you with detailed information about our collaboration opportunities.`,
      support: `I'm here to help! I understand you need support with Xploar.ai. I'll connect you with our technical support team who can provide immediate assistance with any questions or issues you're experiencing.`,
      general: `Thank you for reaching out! I'm excited to learn more about your interest in Xploar.ai. I'll make sure our team connects with you to discuss how we can help with your learning goals and answer any questions you have.`
    };
    
    return responses[type] || responses.general;
  };

  const convertToSpeech = async (text) => {
    try {
      // Use ElevenLabs for voice synthesis
      const audioBlob = await synthesizeSpeech(text);
      
      // Create audio URL and play
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
      
      // Fallback to browser speech synthesis
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const resetConversation = () => {
    setTranscript('');
    setResponse('');
    setQueryType(null);
    setIsProcessing(false);
    setIsPlaying(false);
  };

  const handleRouteQuery = async () => {
    const routingData = {
      queryType,
      transcript,
      response,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    try {
      // Route to appropriate channel based on query type
      switch (queryType) {
        case 'investor':
          await routeToInvestorChannel(routingData);
          break;
        case 'stakeholder':
          await routeToStakeholderChannel(routingData);
          break;
        case 'support':
          await routeToSupportChannel(routingData);
          break;
        default:
          await routeToGeneralChannel(routingData);
      }
    } catch (error) {
      console.error('Routing error:', error);
    }
  };

  const routeToInvestorChannel = async (data) => {
    // Route to WhatsApp for investors
    const whatsappMessage = `🚀 New Investor Query via Xploar.ai Voice Call\n\nQuery: "${data.transcript}"\nResponse: "${data.response}"\nTime: ${data.timestamp}`;
    const whatsappUrl = `https://wa.me/your_investor_whatsapp_number?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Also send to ClickUp
    await sendToClickUp({
      ...data,
      priority: 'high',
      category: 'investor_relations',
      assignee: 'investor_team'
    });
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  const routeToStakeholderChannel = async (data) => {
    // Route to email for stakeholders
    const emailSubject = `New Stakeholder Query - Xploar.ai Voice Call`;
    const emailBody = `Query: ${data.transcript}\n\nAI Response: ${data.response}\n\nTimestamp: ${data.timestamp}`;
    const emailUrl = `mailto:stakeholders@xploar.ai?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Also send to ClickUp
    await sendToClickUp({
      ...data,
      priority: 'medium',
      category: 'stakeholder_relations',
      assignee: 'business_development'
    });
    
    // Open email client
    window.open(emailUrl, '_blank');
  };

  const routeToSupportChannel = async (data) => {
    // Route to WhatsApp for support
    const whatsappMessage = `🆘 Support Query via Xploar.ai Voice Call\n\nQuery: "${data.transcript}"\nResponse: "${data.response}"\nTime: ${data.timestamp}`;
    const whatsappUrl = `https://wa.me/your_support_whatsapp_number?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Also send to ClickUp
    await sendToClickUp({
      ...data,
      priority: 'high',
      category: 'customer_support',
      assignee: 'support_team'
    });
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  const routeToGeneralChannel = async (data) => {
    // Route to general email
    const emailSubject = `New General Query - Xploar.ai Voice Call`;
    const emailBody = `Query: ${data.transcript}\n\nAI Response: ${data.response}\n\nTimestamp: ${data.timestamp}`;
    const emailUrl = `mailto:hello@xploar.ai?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Also send to ClickUp
    await sendToClickUp({
      ...data,
      priority: 'medium',
      category: 'general_inquiry',
      assignee: 'general_team'
    });
    
    // Open email client
    window.open(emailUrl, '_blank');
  };

  const sendToClickUp = async (data) => {
    try {
      await createTask({
        name: `Voice Call Query - ${data.queryType}`,
        description: `Query: ${data.transcript}\n\nAI Response: ${data.response}\n\nTimestamp: ${data.timestamp}`,
        priority: data.priority,
        category: data.category,
        assignee: data.assignee,
        due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        queryType: data.queryType,
        transcript: data.transcript,
        response: data.response,
        timestamp: data.timestamp
      });
      
      // Log interaction to dashboard
      logInteractionToDashboard(data);
    } catch (error) {
      console.error('ClickUp integration error:', error);
    }
  };

  const logInteractionToDashboard = (data) => {
    try {
      const interaction = {
        queryType: data.queryType,
        transcript: data.transcript,
        response: data.response,
        timestamp: data.timestamp,
        priority: data.priority,
        category: data.category,
        source: 'voice_call_button',
        status: 'processed'
      };
      
      // Get existing interactions
      const existingInteractions = JSON.parse(localStorage.getItem('voiceInteractions') || '[]');
      
      // Add new interaction
      const updatedInteractions = [...existingInteractions, {
        ...interaction,
        id: Date.now()
      }];
      
      // Save to localStorage
      localStorage.setItem('voiceInteractions', JSON.stringify(updatedInteractions));
      
      console.log('Interaction logged to dashboard:', interaction);
    } catch (error) {
      console.error('Dashboard logging error:', error);
    }
  };

  return (
    <>
      {/* Floating Voice Call Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-16 h-16 bg-gradient-to-r from-electric-aqua to-neon-lilac rounded-full shadow-2xl hover:shadow-electric-aqua/25 transition-all duration-300 hover:scale-110"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-electric-aqua to-neon-lilac rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
          
          {/* Microphone Icon */}
          <svg className="relative w-8 h-8 text-white mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-electric-aqua animate-ping opacity-20"></div>
        </button>
      </div>

      {/* Voice Call Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-electric-aqua to-neon-lilac rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Talk to Manohar</h3>
              <p className="text-gray-600 text-sm">Ask me anything about Xploar.ai, partnerships, or investments</p>
            </div>

            {/* Query Type Indicator */}
            {queryType && (
              <div className="mb-4 p-3 bg-gradient-to-r from-electric-aqua/10 to-neon-lilac/10 rounded-xl border border-electric-aqua/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-electric-aqua rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {queryType} Query Detected
                  </span>
                </div>
              </div>
            )}

            {/* Transcript Display */}
            {transcript && (
              <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Your Question:</h4>
                <p className="text-gray-900">{transcript}</p>
              </div>
            )}

            {/* AI Response Display */}
            {response && (
              <div className="mb-4 p-4 bg-gradient-to-r from-electric-aqua/10 to-neon-lilac/10 rounded-xl border border-electric-aqua/20">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Manohar's Response:</h4>
                <p className="text-gray-900">{response}</p>
              </div>
            )}

            {/* Controls */}
            <div className="space-y-4">
              {!transcript ? (
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gradient-to-r from-electric-aqua to-neon-lilac hover:shadow-lg text-white'
                  } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isRecording ? 'Stop Recording' : 'Start Voice Call'}
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleRouteQuery}
                    className="w-full py-3 px-6 bg-gradient-to-r from-electric-aqua to-neon-lilac text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Connect with Manohar
                  </button>
                  <button
                    onClick={resetConversation}
                    className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Start New Conversation
                  </button>
                </div>
              )}
            </div>

            {/* Processing Indicator */}
            {isProcessing && (
              <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
                <div className="w-4 h-4 border-2 border-electric-aqua border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Processing your query...</span>
              </div>
            )}

            {/* Recording Indicator */}
            {isRecording && (
              <div className="mt-4 flex items-center justify-center gap-2 text-red-600">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Listening...</span>
              </div>
            )}

            {/* Playing Indicator */}
            {isPlaying && (
              <div className="mt-4 flex items-center justify-center gap-2 text-electric-aqua">
                <div className="w-3 h-3 bg-electric-aqua rounded-full animate-pulse"></div>
                <span className="text-sm">Playing Manohar's Response...</span>
              </div>
            )}

            {/* Audio Element */}
            <audio
              ref={audioRef}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceCallButton;