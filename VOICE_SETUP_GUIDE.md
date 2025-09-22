# Voice Call Button Setup Guide

## Overview
This guide will help you set up the interactive voice call button with ElevenLabs integration and automated query routing.

## Features
- **Voice Recognition**: Speech-to-text for user queries
- **AI Response Generation**: Context-aware responses based on query type
- **ElevenLabs Integration**: Your personal voice synthesis
- **Smart Routing**: Automatic routing to WhatsApp, email, or ClickUp based on query type
- **Dashboard**: Track all voice interactions

## Setup Steps

### 1. ElevenLabs Setup
1. Sign up at [ElevenLabs](https://elevenlabs.io/)
2. Create your personal voice clone:
   - Record 3-5 minutes of clear speech
   - Upload to ElevenLabs voice cloning
   - Get your voice ID
3. Get your API key from the dashboard
4. Copy `.env.example` to `.env` and update with your credentials:
```bash
cp .env.example .env
```
5. Update your `.env` file with your actual credentials:
```env
REACT_APP_ELEVENLABS_API_KEY=your_api_key_here
REACT_APP_ELEVENLABS_VOICE_ID=your_voice_id_here
```

**Note**: The system now uses Manohar's custom voice ID (`ElFZbymR0cz1HI2ZbttJ`) by default.

### 2. ClickUp Setup
1. Create a ClickUp account
2. Create a workspace for voice interactions
3. Set up custom fields:
   - `query_type` (Text)
   - `transcript` (Text)
   - `ai_response` (Text)
   - `timestamp` (Date)
   - `source` (Text)
4. Get your API key and workspace IDs
5. Add to your `.env` file:
```env
REACT_APP_CLICKUP_API_KEY=your_api_key_here
REACT_APP_CLICKUP_TEAM_ID=your_team_id_here
REACT_APP_CLICKUP_SPACE_ID=your_space_id_here
```

### 3. WhatsApp Integration
1. Get your WhatsApp Business API number
2. Add to your `.env` file:
```env
REACT_APP_WHATSAPP_INVESTOR_NUMBER=+1234567890
REACT_APP_WHATSAPP_SUPPORT_NUMBER=+1234567890
```

### 4. Email Configuration
Add your email addresses to `.env`:
```env
REACT_APP_INVESTOR_EMAIL=investors@xploar.ai
REACT_APP_STAKEHOLDER_EMAIL=stakeholders@xploar.ai
REACT_APP_SUPPORT_EMAIL=support@xploar.ai
REACT_APP_GENERAL_EMAIL=hello@xploar.ai
```

## Query Types & Routing

### Investor Queries
- **Keywords**: invest, funding, investor, partnership, investment
- **Routing**: WhatsApp + ClickUp (High Priority)
- **Response**: Professional investment-focused response

### Stakeholder Queries
- **Keywords**: stakeholder, business, collaboration, enterprise
- **Routing**: Email + ClickUp (Medium Priority)
- **Response**: Partnership and collaboration focused

### Support Queries
- **Keywords**: support, help, issue, problem, bug
- **Routing**: WhatsApp + ClickUp (High Priority)
- **Response**: Technical support focused

### General Queries
- **Keywords**: Default fallback
- **Routing**: Email + ClickUp (Medium Priority)
- **Response**: General information about Xploar.ai

## Customization

### Adding New Query Types
1. Update the `handleQueryClassification` function in `VoiceCallButton.jsx`
2. Add new routing functions
3. Update the dashboard stats

### Modifying AI Responses
Edit the `generateAIResponse` function in `VoiceCallButton.jsx` to customize responses for each query type.

### Styling
The voice call button uses Tailwind CSS classes. Modify the styling in `VoiceCallButton.jsx` to match your brand.

## Testing

### Local Testing
1. Start the development server: `npm run dev`
2. Click the voice call button (bottom right)
3. Test with different query types
4. Check the dashboard for interaction history

### Production Testing
1. Deploy to your hosting platform
2. Test voice recognition in different browsers
3. Verify ElevenLabs integration
4. Test routing to WhatsApp/email/ClickUp

## Browser Compatibility

### Supported Browsers
- **Chrome**: Full support (recommended)
- **Safari**: Full support (recommended)
- **Edge**: Full support (recommended)
- **Firefox**: Limited support (may not work properly)

### Browser Requirements
- **HTTPS Required**: Speech recognition requires HTTPS in production
- **Microphone Access**: Users must grant microphone permissions
- **Modern Browser**: Requires Web Speech API support

### Browser Compatibility Features
- **Automatic Detection**: The system automatically detects browser compatibility
- **User Feedback**: Clear error messages for unsupported browsers
- **HTTPS Warning**: Alerts users when HTTPS is required
- **Graceful Degradation**: Fallback to text-based interaction if needed

## Troubleshooting

### Voice Recognition Issues
- Ensure HTTPS in production (required for speech recognition)
- Check browser permissions for microphone access
- Test in different browsers
- Check browser compatibility warnings in the UI

### ElevenLabs Issues
- Verify API key and voice ID
- Check API quota limits
- Test with different text inputs

### Routing Issues
- Verify WhatsApp numbers and email addresses
- Check ClickUp API permissions
- Test individual routing functions

## Security Considerations

### API Keys
- Never commit API keys to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly

### Data Privacy
- Voice recordings are processed locally (browser)
- Transcripts are stored in localStorage
- Consider implementing server-side storage for production

### User Consent
- Add privacy notice for voice recording
- Implement GDPR compliance if needed
- Provide opt-out options

## Future Enhancements

### Planned Features
- [ ] Multi-language support
- [ ] Voice emotion detection
- [ ] Advanced analytics dashboard
- [ ] Integration with CRM systems
- [ ] Automated follow-up sequences
- [ ] Voice call scheduling
- [ ] Integration with calendar systems

### Advanced AI Features
- [ ] Context-aware conversation memory
- [ ] Personalized response learning
- [ ] Sentiment analysis
- [ ] Intent classification improvements
- [ ] Multi-turn conversation support

## Support

For technical support or questions about the voice call button implementation:
- Email: tech@xploar.ai
- Documentation: [Voice Call Button Docs](https://xploar.ai/docs/voice-call-button)
- GitHub Issues: [Report Issues](https://github.com/xploar-ai/voice-call-button/issues)
