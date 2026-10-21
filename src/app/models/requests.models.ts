export interface LogRequestDto {
  url: string;
}

export interface GetEventViewerLogsRequest {
  StartDate: string | null;
  EndDate: string | null;
}