// ElevenLabs API integration for voice synthesis
const ELEVENLABS_API_KEY = process.env.REACT_APP_ELEVENLABS_API_KEY || 'fdc72575644bae081da7963040d15648b628b3d8eb8115fa15b677d02a7fc8a9';
const ELEVENLABS_VOICE_ID = process.env.REACT_APP_ELEVENLABS_VOICE_ID; // Your personal voice ID

export const synthesizeSpeech = async (text, voiceId = ELEVENLABS_VOICE_ID) => {
  try {
    console.log('Synthesizing speech with ElevenLabs:', { text, voiceId });
    
    // Use actual ElevenLabs API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId || 'pNInz6obpgDQGcFmaJgB'}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    return await response.blob();
  } catch (error) {
    console.error('ElevenLabs synthesis error:', error);
    throw error;
  }
};

export const getVoices = async () => {
  try {
    // Mock implementation for development
    console.log('Fetching voices from ElevenLabs');
    
    // In production, replace with actual API call:
    /*
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
      }
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    return await response.json();
    */
    
    // Mock voices for development
    return {
      voices: [
        { voice_id: 'mock_voice_1', name: 'Manohar Voice Clone' },
        { voice_id: 'mock_voice_2', name: 'Professional Male' }
      ]
    };
  } catch (error) {
    console.error('ElevenLabs voices error:', error);
    throw error;
  }
};

export const createVoiceClone = async (name, description, files) => {
  try {
    console.log('Creating voice clone:', { name, description });
    
    // Mock implementation for development
    // In production, replace with actual API call:
    /*
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });

    const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    return await response.json();
    */
    
    // Mock response for development
    return {
      voice_id: 'mock_cloned_voice',
      name: name,
      status: 'processing'
    };
  } catch (error) {
    console.error('ElevenLabs voice clone error:', error);
    throw error;
  }
};