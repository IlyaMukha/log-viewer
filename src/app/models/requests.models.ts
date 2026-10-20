export interface LogRequestDto {
  url: string;
  configPath: string;
}

export interface GetEventViewerLogsRequest {
  StartDate: string | null;
  EndDate: string | null;
}