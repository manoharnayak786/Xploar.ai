// Google Sheets API integration for voice interaction tracking
const GOOGLE_SHEETS_API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
const GOOGLE_SHEETS_ID = process.env.REACT_APP_GOOGLE_SHEETS_ID; // Your Google Sheets ID

export const addVoiceInteractionToSheet = async (interactionData) => {
  try {
    console.log('Adding voice interaction to Google Sheets:', interactionData);
    
    // For now, we'll use a mock implementation
    // In production, you'll replace this with actual Google Sheets API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock implementation for development
    // In production, replace with actual Google Sheets API call:
    /*
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/A:Z:append?valueInputOption=USER_ENTERED&key=${GOOGLE_SHEETS_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [
          [
            new Date().toISOString(),
            interactionData.queryType,
            interactionData.transcript,
            interactionData.response,
            interactionData.priority,
            interactionData.category,
            interactionData.source,
            interactionData.status
          ]
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    return await response.json();
    */
    
    // Mock response for development
    console.log('Voice interaction logged to Google Sheets:', {
      timestamp: new Date().toISOString(),
      queryType: interactionData.queryType,
      transcript: interactionData.transcript,
      response: interactionData.response,
      priority: interactionData.priority,
      category: interactionData.category,
      source: interactionData.source,
      status: interactionData.status
    });
    
    return {
      status: 'success',
      message: 'Voice interaction logged to Google Sheets'
    };
  } catch (error) {
    console.error('Google Sheets integration error:', error);
    throw error;
  }
};

export const getVoiceInteractionsFromSheet = async () => {
  try {
    console.log('Fetching voice interactions from Google Sheets');
    
    // Mock implementation for development
    // In production, replace with actual Google Sheets API call:
    /*
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/A:H?key=${GOOGLE_SHEETS_API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const data = await response.json();
    return data.values || [];
    */
    
    // Mock data for development
    return [
      ['Timestamp', 'Query Type', 'Transcript', 'Response', 'Priority', 'Category', 'Source', 'Status'],
      [new Date().toISOString(), 'investor', 'I want to invest', 'Thank you for your interest...', 'high', 'investor_relations', 'voice_call_button', 'processed']
    ];
  } catch (error) {
    console.error('Google Sheets fetch error:', error);
    throw error;
  }
};

export const createGoogleSheetsTemplate = () => {
  // Instructions for setting up Google Sheets
  const instructions = `
    Google Sheets Setup Instructions:
    
    1. Create a new Google Sheet
    2. Add the following headers in row 1:
       - A1: Timestamp
       - B1: Query Type
       - C1: Transcript
       - D1: Response
       - E1: Priority
       - F1: Category
       - G1: Source
       - H1: Status
    
    3. Get your Google Sheets ID from the URL
    4. Enable Google Sheets API in Google Cloud Console
    5. Create an API key with Sheets API access
    6. Add the following environment variables:
       - REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key
       - REACT_APP_GOOGLE_SHEETS_ID=your_sheet_id
    
    7. Make sure your Google Sheet is publicly readable or shared with the service account
  `;
  
  console.log(instructions);
  return instructions;
};
