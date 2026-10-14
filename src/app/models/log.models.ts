export enum LogType {
  Information = 3,
  Warning = 1,
  Exseption = 2
}

export interface ResultDto {
  logsDTOs: LogEntry[];
  isExseption: boolean;
  exseptions: EexseptionDto | null;
}

export interface LogEntry {
  title: string;
  fullText: string;
  type: LogType;
  allLogs: LogRecord[];
}

export interface EexseptionDto {
  errorMessage: string;
}

export interface LogRecord{
  text:string;
  dateTime: Date;
  file: string;
}