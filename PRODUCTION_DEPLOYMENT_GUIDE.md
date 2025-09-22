# 🚀 Production Deployment Guide - Call to Manohar Feature

## Overview
This guide ensures the "Call to Manohar" voice feature works perfectly in production with Manohar's custom voice.

## ✅ Pre-Deployment Checklist

### 1. Environment Variables Setup
```bash
# Copy the example environment file
cp .env.example .env

# Update with your production values
REACT_APP_ELEVENLABS_API_KEY=your_production_api_key
REACT_APP_ELEVENLABS_VOICE_ID=ElFZbymR0cz1HI2ZbttJ
```

### 2. HTTPS Configuration (CRITICAL)
- ✅ **HTTPS is REQUIRED** for speech recognition in production
- ✅ Configure SSL certificate on your hosting platform
- ✅ Test voice feature on HTTPS domain

### 3. Browser Compatibility
- ✅ Chrome (Recommended)
- ✅ Safari (Recommended) 
- ✅ Edge (Recommended)
- ⚠️ Firefox (Limited support)

## 🚀 Deployment Steps

### For Vercel (Recommended)
1. **Connect Repository**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **Environment Variables**:
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.example`

3. **Domain Configuration**:
   - Ensure custom domain uses HTTPS
   - Test voice feature on production domain

### For Netlify
1. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**:
   - Site Settings → Environment Variables
   - Add all variables from `.env.example`

3. **HTTPS Configuration**:
   - Netlify provides HTTPS by default
   - Test voice feature after deployment

### For Other Platforms
- Ensure HTTPS is enabled
- Set environment variables
- Test voice functionality

## 🧪 Production Testing

### 1. Voice Call Button Test
```bash
# Test the voice call button
1. Click the floating phone button (bottom right)
2. Click "Start Call"
3. Grant microphone permissions
4. Speak a test message
5. Verify Manohar's voice responds
```

### 2. Browser Compatibility Test
- Test on Chrome, Safari, Edge
- Verify error messages on unsupported browsers
- Check HTTPS warnings on HTTP

### 3. ElevenLabs Integration Test
- Click "Test ElevenLabs Connection" button
- Verify API connection works
- Test voice synthesis with Manohar's voice

## 🔧 Troubleshooting

### Voice Not Working
1. **Check HTTPS**: Ensure site is served over HTTPS
2. **Check Browser**: Use Chrome, Safari, or Edge
3. **Check Permissions**: Grant microphone access
4. **Check Console**: Look for error messages

### Manohar's Voice Not Playing
1. **Check API Key**: Verify ElevenLabs API key is correct
2. **Check Voice ID**: Ensure `ElFZbymR0cz1HI2ZbttJ` is set
3. **Check Network**: Verify API calls are successful
4. **Check Console**: Look for synthesis errors

### Browser Compatibility Issues
1. **Unsupported Browser**: Show error message
2. **No HTTPS**: Show HTTPS warning
3. **No Microphone**: Show permission request

## 📊 Monitoring

### Key Metrics to Monitor
- Voice call success rate
- Browser compatibility
- ElevenLabs API usage
- User engagement with voice feature

### Error Tracking
- Speech recognition errors
- Voice synthesis failures
- Browser compatibility issues
- Network connectivity problems

## 🎯 Production Features

### ✅ What's Working
- **Manohar's Custom Voice**: Uses actual cloned voice
- **Smart Query Routing**: Automatic classification and routing
- **Browser Compatibility**: Works on modern browsers
- **Error Handling**: Comprehensive error management
- **Memory Management**: Proper cleanup prevents leaks
- **HTTPS Security**: Production-ready security

### 🔄 Query Types Supported
- **Investor Queries**: High priority routing
- **Stakeholder Queries**: Business partnership routing
- **Support Queries**: Technical support routing
- **General Queries**: General information routing

## 📞 Support

### For Technical Issues
- Check browser console for errors
- Verify environment variables
- Test on different browsers
- Check HTTPS configuration

### For Voice Quality Issues
- Verify ElevenLabs API key
- Check voice ID configuration
- Test with different text inputs
- Monitor API usage limits

## 🎉 Success Indicators

### ✅ Production Ready When:
- Voice call button appears on all pages
- Manohar's voice responds to queries
- Browser compatibility warnings work
- HTTPS validation functions
- Query routing works correctly
- No console errors
- Smooth user experience

---

**🚀 Your "Call to Manohar" feature is now production-ready!**

The feature will use Manohar's actual cloned voice and provide a professional voice interaction experience for your users.
