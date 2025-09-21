// ClickUp API integration for task management
const CLICKUP_API_KEY = process.env.REACT_APP_CLICKUP_API_KEY;
const CLICKUP_TEAM_ID = process.env.REACT_APP_CLICKUP_TEAM_ID;
const CLICKUP_SPACE_ID = process.env.REACT_APP_CLICKUP_SPACE_ID;

export const createTask = async (taskData) => {
  try {
    // For now, we'll use a mock implementation
    // In production, you'll replace this with actual ClickUp API
    console.log('Creating ClickUp task:', taskData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock implementation for development
    // In production, replace with actual API call:
    /*
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
    */
    
    // Mock response for development
    return {
      id: `mock_task_${Date.now()}`,
      name: taskData.name,
      status: 'created',
      priority: taskData.priority,
      category: taskData.category
    };
  } catch (error) {
    console.error('ClickUp task creation error:', error);
    throw error;
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    console.log('Updating ClickUp task:', { taskId, updates });
    
    // Mock implementation for development
    // In production, replace with actual API call:
    /*
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
    */
    
    // Mock response for development
    return {
      id: taskId,
      status: 'updated',
      ...updates
    };
  } catch (error) {
    console.error('ClickUp task update error:', error);
    throw error;
  }
};

export const getTasks = async (listId = CLICKUP_SPACE_ID) => {
  try {
    console.log('Fetching ClickUp tasks:', listId);
    
    // Mock implementation for development
    // In production, replace with actual API call:
    /*
    const response = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
      headers: {
        'Authorization': CLICKUP_API_KEY,
      }
    });

    if (!response.ok) {
      throw new Error(`ClickUp API error: ${response.status}`);
    }

    return await response.json();
    */
    
    // Mock tasks for development
    return {
      tasks: [
        {
          id: 'mock_task_1',
          name: 'Voice Call Query - investor',
          status: 'open',
          priority: 'high',
          category: 'investor_relations'
        },
        {
          id: 'mock_task_2',
          name: 'Voice Call Query - support',
          status: 'open',
          priority: 'high',
          category: 'customer_support'
        }
      ]
    };
  } catch (error) {
    console.error('ClickUp tasks fetch error:', error);
    throw error;
  }
};