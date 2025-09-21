// ClickUp API integration for task management
const CLICKUP_API_KEY = process.env.REACT_APP_CLICKUP_API_KEY;
const CLICKUP_TEAM_ID = process.env.REACT_APP_CLICKUP_TEAM_ID;
const CLICKUP_SPACE_ID = process.env.REACT_APP_CLICKUP_SPACE_ID;

export const createTask = async (taskData) => {
  try {
    const response = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_SPACE_ID}/task`, {
      method: 'POST',
      headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: taskData.name,
        description: taskData.description,
        priority: taskData.priority === 'high' ? 1 : taskData.priority === 'medium' ? 2 : 3,
        due_date: taskData.due_date,
        tags: [taskData.category],
        custom_fields: [
          {
            id: 'query_type',
            value: taskData.queryType
          },
          {
            id: 'transcript',
            value: taskData.transcript
          },
          {
            id: 'ai_response',
            value: taskData.response
          },
          {
            id: 'timestamp',
            value: taskData.timestamp
          },
          {
            id: 'source',
            value: 'voice_call_button'
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`ClickUp API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('ClickUp task creation error:', error);
    throw error;
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const response = await fetch(`https://api.clickup.com/api/v2/task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      throw new Error(`ClickUp API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('ClickUp task update error:', error);
    throw error;
  }
};

export const getTasks = async (listId = CLICKUP_SPACE_ID) => {
  try {
    const response = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
      headers: {
        'Authorization': CLICKUP_API_KEY,
      }
    });

    if (!response.ok) {
      throw new Error(`ClickUp API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('ClickUp tasks fetch error:', error);
    throw error;
  }
};

export const createWebhook = async (webhookData) => {
  try {
    const response = await fetch(`https://api.clickup.com/api/v2/team/${CLICKUP_TEAM_ID}/webhook`, {
      method: 'POST',
      headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: webhookData.endpoint,
        events: webhookData.events,
        space_id: CLICKUP_SPACE_ID
      })
    });

    if (!response.ok) {
      throw new Error(`ClickUp API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('ClickUp webhook creation error:', error);
    throw error;
  }
};
