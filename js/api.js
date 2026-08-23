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
    return this.downloadPDF(`${API_BASE}/rti/generate`, payload, 'RTI_Application.pdf');
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
    return this.downloadPDF(`${API_BASE}/form/generate`, payload, 'Official_Intake_Form.pdf');
  },

  /**
   * Helper PDF download method
   */
  async downloadPDF(url, payload, filename = 'Document.pdf') {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(`PDF generation server error: ${response.statusText}`);
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 1000);
      return true;
    } catch (err) {
      console.error(`API Error [PDF Download ${url}]:`, err);
      throw err;
    }
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
