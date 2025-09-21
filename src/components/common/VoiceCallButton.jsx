import React, { useState, useRef, useEffect } from 'react';
import { synthesizeSpeech, synthesizeSpeechStreaming, testElevenLabsConnection } from '../../lib/elevenlabs';
import { createTask } from '../../lib/clickup';
import { addVoiceInteractionToSheet } from '../../lib/googleSheets';

const VoiceCallButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [queryType, setQueryType] = useState(null);
  const [response, setResponse] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // New call flow states
  const [callState, setCallState] = useState('idle'); // 'idle', 'connecting', 'ringing', 'connected', 'ended'
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // Real-time voice states
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [voiceActivityTimeout, setVoiceActivityTimeout] = useState(null);
  
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        setIsRecording(true);
      };

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Update transcript display
        setTranscript(finalTranscript || interimTranscript);
        
        // Only process final results when connected
        if (callState === 'connected' && finalTranscript.trim()) {
          console.log('Processing final transcript:', finalTranscript);
          handleQueryClassification(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setIsProcessing(false);
        
        // Handle specific errors
        if (event.error === 'not-allowed') {
          console.error('Microphone access denied');
        } else if (event.error === 'no-speech') {
          console.log('No speech detected, restarting...');
          // Restart recognition after a short delay
          setTimeout(() => {
            if (callState === 'connected' && !isAISpeaking) {
              startContinuousListening();
            }
          }, 1000);
        } else if (event.error === 'network') {
          console.error('Network error in speech recognition');
        }
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        setIsRecording(false);
        // Restart recognition if still in connected state
        if (callState === 'connected' && !isAISpeaking) {
          setTimeout(() => {
            startContinuousListening();
          }, 100);
        }
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
    
    // Restart listening after response (Siri-like behavior)
    setTimeout(() => {
      if (callState === 'connected') {
        startContinuousListening();
      }
    }, 1000);
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
      // Stop listening while speaking
      stopContinuousListening();
      setIsAISpeaking(true);
      setIsPlaying(true);
      
      console.log('Converting to speech:', text);
      
      // Use ElevenLabs for high-quality voice synthesis
      const audioBlob = await synthesizeSpeech(text);
      
      // Create audio URL and play
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch((error) => {
          console.error('Audio play error:', error);
          setIsPlaying(false);
          setIsAISpeaking(false);
          // Restart listening after error
          setTimeout(() => {
            if (callState === 'connected') {
              startContinuousListening();
            }
          }, 500);
        });
      }
      
    } catch (error) {
      console.error('Speech synthesis error:', error);
      
      // Fallback to browser speech synthesis
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        setIsPlaying(false);
        setIsAISpeaking(false);
        // Restart listening after speech ends
        setTimeout(() => {
          if (callState === 'connected') {
            startContinuousListening();
          }
        }, 500);
      };
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        setIsPlaying(false);
        setIsAISpeaking(false);
        // Restart listening after error
        setTimeout(() => {
          if (callState === 'connected') {
            startContinuousListening();
          }
        }, 500);
      };
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
    setCallState('idle');
    setIsConnecting(false);
    setIsRinging(false);
    setIsConnected(false);
  };

  const startCall = () => {
    setCallState('connecting');
    setIsConnecting(true);
    setIsOpen(true);
    
    // Start connecting animation
    setTimeout(() => {
      setCallState('ringing');
      setIsConnecting(false);
      setIsRinging(true);
      
      // Play ringing tone (you can add actual audio file)
      playRingingTone();
      
      // After 3 seconds, connect
      setTimeout(() => {
        setCallState('connected');
        setIsRinging(false);
        setIsConnected(true);
        
        // Play Manohar's greeting
        playManoharGreeting();
        
        // Start continuous listening after greeting
        setTimeout(() => {
          startContinuousListening();
        }, 2000);
      }, 3000);
    }, 1000);
  };

  const playRingingTone = () => {
    // Create a simple ringing tone using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 3);
  };

  const playManoharGreeting = async () => {
    const greeting = "Hey, what's going on? How can I help you today?";
    await convertToSpeech(greeting);
  };

  const startContinuousListening = async () => {
    if (recognitionRef.current && callState === 'connected') {
      setIsRecording(true);
      
      // Start voice activity detection
      await startVoiceActivityDetection();
      
      // Start speech recognition
      recognitionRef.current.start();
    }
  };

  const startVoiceActivityDetection = async () => {
    try {
      // Get microphone access with better constraints
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      mediaStreamRef.current = stream;
      
      // Create audio context for voice activity detection
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      let silenceCounter = 0;
      const silenceThreshold = 10; // frames of silence before considering speech ended
      
      // Voice activity detection loop
      const detectVoiceActivity = () => {
        if (callState !== 'connected' || isAISpeaking) return;
        
        analyser.getByteFrequencyData(dataArray);
        
        // Calculate RMS (Root Mean Square) for better voice detection
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i] * dataArray[i];
        }
        const rms = Math.sqrt(sum / bufferLength);
        
        // Voice activity threshold (adjusted for RMS)
        const threshold = 15;
        
        if (rms > threshold) {
          silenceCounter = 0;
          if (!isUserSpeaking) {
            setIsUserSpeaking(true);
            console.log('User started speaking, RMS:', rms);
            
            // Clear any existing timeout
            if (voiceActivityTimeout) {
              clearTimeout(voiceActivityTimeout);
            }
          }
        } else {
          silenceCounter++;
          if (isUserSpeaking && silenceCounter > silenceThreshold) {
            setIsUserSpeaking(false);
            console.log('User stopped speaking');
            
            // Process the speech after user stops talking
            if (transcript.trim()) {
              handleQueryClassification(transcript);
            }
          }
        }
        
        // Continue detection
        requestAnimationFrame(detectVoiceActivity);
      };
      
      detectVoiceActivity();
    } catch (error) {
      console.error('Voice activity detection error:', error);
      // Fallback: just use speech recognition without VAD
      console.log('Falling back to speech recognition only');
    }
  };

  const stopContinuousListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    
    // Clean up voice activity detection
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (voiceActivityTimeout) {
      clearTimeout(voiceActivityTimeout);
      setVoiceActivityTimeout(null);
    }
    
    setIsUserSpeaking(false);
  };

  const testElevenLabs = async () => {
    try {
      console.log('Testing ElevenLabs connection...');
      const result = await testElevenLabsConnection();
      console.log('ElevenLabs test successful:', result);
      alert('ElevenLabs connection successful! Check console for details.');
    } catch (error) {
      console.error('ElevenLabs test failed:', error);
      alert('ElevenLabs connection failed: ' + error.message);
    }
  };

  const endCall = () => {
    // Stop continuous listening
    stopContinuousListening();
    
    setCallState('ended');
    setIsConnected(false);
    setIsRinging(false);
    setIsConnecting(false);
    
    // Reset after a short delay
    setTimeout(() => {
      resetConversation();
      setIsOpen(false);
    }, 1000);
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
    // Route to email for investors
    const emailSubject = `🚀 New Investor Query - Xploar.ai Voice Call`;
    const emailBody = `Query: ${data.transcript}\n\nAI Response: ${data.response}\n\nTimestamp: ${data.timestamp}`;
    const emailUrl = `mailto:manoharnayak786@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Also send to ClickUp
    await sendToClickUp({
      ...data,
      priority: 'high',
      category: 'investor_relations',
      assignee: 'investor_team'
    });
    
    // Open email client
    window.open(emailUrl, '_blank');
  };

  const routeToStakeholderChannel = async (data) => {
    // Route to email for stakeholders
    const emailSubject = `New Stakeholder Query - Xploar.ai Voice Call`;
    const emailBody = `Query: ${data.transcript}\n\nAI Response: ${data.response}\n\nTimestamp: ${data.timestamp}`;
    const emailUrl = `mailto:manoharnayak786@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
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
    // Route to email for support
    const emailSubject = `🆘 Support Query - Xploar.ai Voice Call`;
    const emailBody = `Query: ${data.transcript}\n\nAI Response: ${data.response}\n\nTimestamp: ${data.timestamp}`;
    const emailUrl = `mailto:manoharnayak786@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Also send to ClickUp
    await sendToClickUp({
      ...data,
      priority: 'high',
      category: 'customer_support',
      assignee: 'support_team'
    });
    
    // Open email client
    window.open(emailUrl, '_blank');
  };

  const routeToGeneralChannel = async (data) => {
    // Route to general email
    const emailSubject = `New General Query - Xploar.ai Voice Call`;
    const emailBody = `Query: ${data.transcript}\n\nAI Response: ${data.response}\n\nTimestamp: ${data.timestamp}`;
    const emailUrl = `mailto:manoharnayak786@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
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
      
      // Log interaction to Google Sheets
      logInteractionToGoogleSheets(data);
    } catch (error) {
      console.error('ClickUp integration error:', error);
    }
  };

  const logInteractionToGoogleSheets = async (data) => {
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
      
      // Add to Google Sheets
      await addVoiceInteractionToSheet(interaction);
      
      console.log('Interaction logged to Google Sheets:', interaction);
    } catch (error) {
      console.error('Google Sheets logging error:', error);
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
          
          {/* Phone Call Icon */}
          <svg className="relative w-8 h-8 text-white mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
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
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Manohar</h3>
              <p className="text-gray-600 text-sm">Real-time voice conversation with the founder</p>
            </div>

            {/* Call Flow States */}
            {callState === 'idle' && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Click to start a real-time voice call with Manohar</p>
                  <button
                    onClick={startCall}
                    className="w-full py-3 px-6 bg-gradient-to-r from-electric-aqua to-neon-lilac text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Start Call
                  </button>
                  <button
                    onClick={testElevenLabs}
                    className="w-full py-2 px-4 mt-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-all duration-300"
                  >
                    Test ElevenLabs Connection
                  </button>
                </div>
              </div>
            )}

            {/* Connecting State */}
            {callState === 'connecting' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-electric-aqua to-neon-lilac rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Connecting with Founder...</h4>
                  <p className="text-gray-600 text-sm">Please wait while we connect you</p>
                </div>
                
                <button
                  onClick={endCall}
                  className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Cancel Call
                </button>
              </div>
            )}

            {/* Ringing State */}
            {callState === 'ringing' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-electric-aqua to-neon-lilac rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Ringing...</h4>
                  <p className="text-gray-600 text-sm">Calling Manohar</p>
                </div>
                
                <button
                  onClick={endCall}
                  className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  End Call
                </button>
              </div>
            )}

            {/* Connected State - Siri-like Conversation */}
            {callState === 'connected' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
                    isUserSpeaking ? 'bg-red-500 animate-pulse' : 
                    isAISpeaking ? 'bg-blue-500 animate-pulse' : 
                    isRecording ? 'bg-gradient-to-r from-electric-aqua to-neon-lilac animate-pulse' : 'bg-green-500'
                  }`}>
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Connected!</h4>
                  <p className="text-gray-600 text-sm">
                    {isUserSpeaking ? 'You are speaking...' : 
                     isAISpeaking ? 'Manohar is responding...' : 
                     isRecording ? 'Listening... Just speak naturally' : 'Ready to listen'}
                  </p>
                </div>
                
                {/* Live Transcript Display */}
                {transcript && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">You said:</h5>
                    <p className="text-gray-900">{transcript}</p>
                  </div>
                )}
                
                {/* AI Response Display */}
                {response && (
                  <div className="p-4 bg-gradient-to-r from-electric-aqua/10 to-neon-lilac/10 rounded-xl border border-electric-aqua/20">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Manohar:</h5>
                    <p className="text-gray-900">{response}</p>
                  </div>
                )}
                
                <button
                  onClick={endCall}
                  className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  End Call
                </button>
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
                <span className="text-sm">Manohar is speaking...</span>
              </div>
            )}

            {/* Audio Element */}
            <audio
              ref={audioRef}
              onEnded={() => {
                setIsPlaying(false);
                setIsAISpeaking(false);
                // Restart listening after ElevenLabs audio ends
                setTimeout(() => {
                  if (callState === 'connected') {
                    startContinuousListening();
                  }
                }, 500);
              }}
              className="hidden"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceCallButton;