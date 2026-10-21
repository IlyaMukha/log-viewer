import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';
import {LogEntity, LogOfImpact, ResultDto} from '../models/log.models';
import { LogDirectorie, Project } from '../models/project.models';
import { LogRequestDto } from '../models/requests.models';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  getFiles(request: string): Observable<LogDirectorie[]> {
    return this.http.post<LogDirectorie[]>(
      `${this.appConfig.apiUrl}/SubDir`,
      JSON.stringify(request),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(
      `${this.appConfig.apiUrl}/Projects`
    );
  }

  getLogs(request: LogRequestDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(
      `${this.appConfig.apiUrl}/Logs`,
      request
    );
  }

  getLogFile(path: string) {
    return this.http.post<LogOfImpact[]>(
      `${this.appConfig.apiUrl}/ReadLogFile`,
      { path }
    );
  }
  getEventViewerLogs(startDate: string | null = null, endDate: string | null = null): Observable<LogEntity[]> {
    return this.http.post<LogEntity[]>(
      `${this.appConfig.apiUrl}/EventViewer`,
      {
        startDate,
        endDate
      }
    );
  }
}