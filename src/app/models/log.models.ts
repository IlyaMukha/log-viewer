export enum LogType {
  Information = 0,
  Warning = 1,
  Exseption = 2,
  Fatal = 3,
  Debug = 4,
  Unknow = 5
}

export interface ResultDto {
  logs: LogEntity[];
}

export interface LogEntity {
  title: string;
  fullText: string;
  type: LogType;
  startDate: Date;
  endDate: Date;
  logOfImpactList: LogOfImpact[];
}

export interface LogOfImpact{
  text:string;
  time: Date;
  file: string;
}

export interface EexseptionDto {
  errorMessage: string;
}