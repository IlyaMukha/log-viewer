export enum LogType {
  Information = 0,
  Warning = 1,
  Exseption = 2
}

export enum FileSystemType {
  Directory = 0,
  File = 1
}





export interface ExseptionLogsDTO {
  title: string;
  description: string;
  logType: LogType;
  logCount: number;
}

export interface EexseptionDto {
  errorMessage: string;
}

export interface ResultDto {
  logsDTOs: ExseptionLogsDTO[];
  isExseption: boolean;
  exseptions: EexseptionDto | null;
}

export interface LogRequestDto {
  url: string;
  configPath: string;
}




export interface Project {
  name: string;
  physicalPath: string;
  configTargetPath: string;
  configPath: string;
  logsPath: string;
  logDirectories: LogDirectorie[];
}

export interface LogDirectorie{
  name: string;
  shortName: string;
  type: FileSystemType
}