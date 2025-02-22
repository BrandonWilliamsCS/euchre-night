export class ApiService {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // #region system
  initialize() {
    return this.post("/System/Initialize", undefined);
  }
  // #endregion system

  // #region player
  addPlayer(dto) {
    return this.put("/Players", dto);
  }

  getPlayers() {
    return this.get("/Players");
  }
  // #endregion player

  // #region score reports
  getScoreReport(sessionId) {
    return this.get(`/ScoreReport/?sessionId=${sessionId}`);
  }

  startScoreReportProcessing() {
    return this.post("/ScoreReport/StartProcessing", undefined);
  }
  // #endregion score reports

  // #region hand reports
  placeHandReport(dto) {
    return this.post("/HandReport", dto);
  }
  // #endregion hand reports

  // #region sessions
  getCurrentSession() {
    return this.get("/Sessions/Current");
  }

  startNewSession() {
    return this.post("/Sessions/StartNew", undefined);
  }
  // #endregion sessions

  // #region internals
  async get(endpoint) {
    return await this.baseRequest(endpoint, "get");
  }

  async post(endpoint, data) {
    return await this.baseRequest(endpoint, "post", data);
  }

  async put(endpoint, data) {
    return await this.baseRequest(endpoint, "put", data);
  }

  async baseRequest(
    endpoint,
    method,
    body
  ) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers:
        body != undefined
          ? {
              "Content-Type": "application/json",
            }
          : undefined,
      body: body != undefined ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json());
  }
  // #endregion internals
}
