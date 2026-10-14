
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface AppConfig {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config!: AppConfig;

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    return firstValueFrom(
      this.http.get<AppConfig>('/config.json')
    ).then(config => {
      this.config = config;
    });
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }
}
