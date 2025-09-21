import React, { useState, useEffect } from 'react';

const VoiceDashboard = () => {
  const [interactions, setInteractions] = useState([]);
  const [stats, setStats] = useState({
    totalCalls: 0,
    investorQueries: 0,
    stakeholderQueries: 0,
    supportQueries: 0,
    generalQueries: 0
  });

  useEffect(() => {
    // Load interaction history from localStorage or API
    const savedInteractions = localStorage.getItem('voiceInteractions');
    if (savedInteractions) {
      const parsed = JSON.parse(savedInteractions);
      setInteractions(parsed);
      calculateStats(parsed);
    }
  }, []);

  const calculateStats = (interactions) => {
    const newStats = {
      totalCalls: interactions.length,
      investorQueries: interactions.filter(i => i.queryType === 'investor').length,
      stakeholderQueries: interactions.filter(i => i.queryType === 'stakeholder').length,
      supportQueries: interactions.filter(i => i.queryType === 'support').length,
      generalQueries: interactions.filter(i => i.queryType === 'general').length
    };
    setStats(newStats);
  };

  const addInteraction = (interaction) => {
    const newInteractions = [...interactions, {
      ...interaction,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }];
    setInteractions(newInteractions);
    localStorage.setItem('voiceInteractions', JSON.stringify(newInteractions));
    calculateStats(newInteractions);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getQueryTypeColor = (type) => {
    const colors = {
      investor: 'bg-green-100 text-green-800',
      stakeholder: 'bg-blue-100 text-blue-800',
      support: 'bg-red-100 text-red-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors.general;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Voice Interaction Dashboard</h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-electric-aqua rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-r from-electric-aqua/10 to-neon-lilac/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.totalCalls}</div>
          <div className="text-sm text-gray-600">Total Calls</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.investorQueries}</div>
          <div className="text-sm text-gray-600">Investor</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.stakeholderQueries}</div>
          <div className="text-sm text-gray-600">Stakeholder</div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.supportQueries}</div>
          <div className="text-sm text-gray-600">Support</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">{stats.generalQueries}</div>
          <div className="text-sm text-gray-600">General</div>
        </div>
      </div>

      {/* Recent Interactions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Interactions</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {interactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>No voice interactions yet</p>
              <p className="text-sm">Start a conversation to see interactions here</p>
            </div>
          ) : (
            interactions.slice().reverse().map((interaction) => (
              <div key={interaction.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQueryTypeColor(interaction.queryType)}`}>
                      {interaction.queryType}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(interaction.priority)}`}>
                      {interaction.priority}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(interaction.timestamp)}</span>
                </div>
                
                <div className="mb-2">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Query:</h4>
                  <p className="text-sm text-gray-700">{interaction.transcript}</p>
                </div>
                
                <div className="mb-2">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">AI Response:</h4>
                  <p className="text-sm text-gray-700">{interaction.response}</p>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Source: {interaction.source || 'voice_call_button'}</span>
                  <span>•</span>
                  <span>Status: {interaction.status || 'processed'}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
            <div className="text-green-600 font-medium text-sm">Export Data</div>
          </button>
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
            <div className="text-blue-600 font-medium text-sm">View Analytics</div>
          </button>
          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
            <div className="text-purple-600 font-medium text-sm">Settings</div>
          </button>
          <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            <div className="text-gray-600 font-medium text-sm">Clear History</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceDashboard;
