export enum FileSystemType {
  Directory = 0,
  File = 1
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
