import React, { useState, useRef, useEffect } from 'react';

const VoiceCallButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef(null);

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
        setIsProcessing(true);
        
        // Simulate processing time
        setTimeout(() => {
          setIsProcessing(false);
        }, 2000);
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
    setIsProcessing(false);
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

            {/* Transcript Display */}
            {transcript && (
              <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Your Question:</h4>
                <p className="text-gray-900">{transcript}</p>
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
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 px-6 bg-gradient-to-r from-electric-aqua to-neon-lilac text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Close
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
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceCallButton;