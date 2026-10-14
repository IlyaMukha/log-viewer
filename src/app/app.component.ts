import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogEntry, LogType } from './models/log.models';
import { LogService } from './services/log.service';
import { MainInfoComponent } from '../app/pages/main-info/main-info.component';
import { HeaderInfoComponent } from '../app/pages/header-info/header-info.component';
import { IisInfoComponent } from '../app/pages/iis-info/iis-info.component';
import { LogDirectorie, Project } from './models/project.models';
import { LogRequestDto } from './models/requests.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MainInfoComponent,
    HeaderInfoComponent,
    IisInfoComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {

  url = '';

  logs: LogEntry[] = [];

  errorMessage = '';

  loading = false;

  readonly LogType = LogType;

  projects: Project[] = [];

  projectsLoading = false;

  projectsError = '';

  expandedProject: Project | null = null;

  isDarkTheme = false;

  expandedDirectory: string | null = null;

  directoryContents: Record<string, LogDirectorie[]> = {};

  private readonly themeStorageKey = 'log-viewer-theme';

  constructor(private logService: LogService, @Inject(PLATFORM_ID) private platformId: object){

  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadTheme();
  }

  // -------------------------
  // Projects
  // -------------------------

  loadProjects(): void {
    this.projectsLoading = true;
    this.projectsError = '';

    this.logService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.projectsLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.projectsError =
          error?.error?.message ??
          'Не удалось получить список проектов IIS.';
        this.projectsLoading = false;
      }
    });
  }

  toggleProject(project: Project): void {
    if (this.expandedProject === project) {
      this.expandedProject = null;
      return;
    }
    this.expandedProject = project;
  }

  // -------------------------
  // Log directory
  // -------------------------

  toggleDirectory(dirPath: string): void {
    if (this.expandedDirectory === dirPath) {
      this.expandedDirectory = null;
      return;
    }

    this.expandedDirectory = dirPath;

    if (this.directoryContents[dirPath]) {
      return;
    }

    this.logService.getFiles(dirPath).subscribe({
      next: (result) => {
        this.directoryContents[dirPath] = result;
      },
      error: (error) => {
        console.error('Ошибка загрузки папки:', error);
      }
    });
  }

  selectLogDirectory(project: Project, logDirectory: string): void {
    this.url = logDirectory;
    this.errorMessage = '';
    this.logs = [];
    this.loading = true;

    const request: LogRequestDto = {
      url: logDirectory,
      configPath: project.configPath
    };

    this.logService.getLogs(request).subscribe({
      next: (result) => {
        if (result.isExseption) {
          this.errorMessage =
            result.exseptions?.errorMessage ??
            'Произошла ошибка при обработке логов.';
          return;
        }
        this.logs = result.logsDTOs;
      },

      error: (error) => {
        console.error(error);
        this.errorMessage =
          error?.error?.message ??
          'Не удалось выполнить запрос к серверу.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  // -------------------------
  // Logs
  // -------------------------

  getLogs(): void {
    this.errorMessage = '';
    this.logs = [];
    if (!this.url.trim()) {
      this.errorMessage = 'Выберите папку с логами.';
      return;
    }
    this.loading = true;
  }

  private loadTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const savedTheme = localStorage.getItem(this.themeStorageKey);

    this.isDarkTheme = savedTheme === 'dark';

    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;

    this.applyTheme();

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        this.themeStorageKey,
        this.isDarkTheme ? 'dark' : 'light'
      );
    }
  }

  private applyTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    document.documentElement.setAttribute(
      'data-bs-theme',
      this.isDarkTheme ? 'dark' : 'light'
    );
  }

}