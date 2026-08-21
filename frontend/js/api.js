/**
 * NyayaSetu API Client
 * Centralized API handler for communicating with the Flask backend.
 */

const API_BASE = '/api';

const API = {
  /**
   * Orchestrate query intent
   */
  async orchestrateQuery(queryText) {
    return this._post(`${API_BASE}/orchestrate`, { query: queryText });
  },

  /**
   * Rights Navigator endpoints
   */
  async analyzeRights(payload) {
    return this._post(`${API_BASE}/rights/analyze`, payload);
  },

  /**
   * RTI Builder endpoints
   */
  async analyzeRTI(payload) {
    return this._post(`${API_BASE}/rti/analyze`, payload);
  },

  async generateRTI(payload) {
    return this._post(`${API_BASE}/rti/generate`, payload);
  },

  /**
   * Scheme Eligibility Checker endpoints
   */
  async checkScheme(payload) {
    return this._post(`${API_BASE}/scheme/check`, payload);
  },

  /**
   * Form Filler endpoints
   */
  async analyzeForm(payload) {
    return this._post(`${API_BASE}/form/analyze`, payload);
  },

  async generateFormPDF(payload) {
    return this._post(`${API_BASE}/form/generate`, payload);
  },

  /**
   * Source retrieval
   */
  async getSourceDetails(sourceId) {
    return this._get(`${API_BASE}/source/${sourceId}`);
  },

  /**
   * Helper HTTP POST method
   */
  async _post(url, body) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${response.status})`);
      }
      
      return await response.json();
    } catch (err) {
      console.error(`API Error [POST ${url}]:`, err);
      throw err;
    }
  },

  /**
   * Helper HTTP GET method
   */
  async _get(url) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${response.status})`);
      }
      
      return await response.json();
    } catch (err) {
      console.error(`API Error [GET ${url}]:`, err);
      throw err;
    }
  }
};

window.API = API;
