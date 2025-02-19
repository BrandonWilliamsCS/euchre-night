import { AddPlayerDto } from "./AddPlayerDto";
import { PlaceHandReportDto } from "./PlaceHandReportDto";
import { PlayerDto } from "./PlayerDto";
import { ScoreReportDto } from "./ScoreReportDto";
import { SessionDto } from "./SessionDto";

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // #region system
  public initialize(): Promise<void> {
    return this.post("/System/Initialize", undefined);
  }
  // #endregion system

  // #region player
  public addPlayer(dto: AddPlayerDto): Promise<PlayerDto> {
    return this.put("/Players", dto);
  }

  public getPlayers(): Promise<PlayerDto[]> {
    return this.get("/Players");
  }
  // #endregion player

  // #region score reports
  public getScoreReport(sessionId: string): Promise<ScoreReportDto> {
    return this.get(`/ScoreReport/?sessionId=${sessionId}`);
  }

  public startScoreReportProcessing(): Promise<void> {
    return this.post("/ScoreReport/StartProcessing", undefined);
  }
  // #endregion score reports

  // #region hand reports
  public placeHandReport(dto: PlaceHandReportDto): Promise<void> {
    return this.post("/HandReport", dto);
  }
  // #endregion hand reports

  // #region sessions
  public getCurrentSession(): Promise<SessionDto> {
    return this.get("/Sessions/Current");
  }

  public startNewSession(): Promise<void> {
    return this.post("/Sessions/StartNew", undefined);
  }
  // #endregion sessions

  // #region internals
  private async get<T>(endpoint: string): Promise<T> {
    return await this.baseRequest(`${this.baseUrl}/${endpoint}`, "get");
  }

  private async post<T>(endpoint: string, data: any): Promise<T> {
    return await this.baseRequest(`${this.baseUrl}/${endpoint}`, "post", data);
  }

  private async put<T>(endpoint: string, data: any): Promise<T> {
    return await this.baseRequest(`${this.baseUrl}/${endpoint}`, "put", data);
  }

  private async baseRequest<T>(
    endpoint: string,
    method: "get" | "post" | "put",
    body?: unknown
  ) {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
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
    return (await response.json()) as T;
  }
  // #endregion internals
}
