import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryTreeComponent } from '../directory-tree/directory-tree.component';
import { LogDirectorie, Project } from '../../models/project.models';
import { LogEntity, LogOfImpact, LogType } from '../../models/log.models';
import { AllLogsModalComponent } from '../all-logs-modal/all-logs-modal.component';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-iis-info',
  standalone: true,
  imports: [
    CommonModule, 
    DirectoryTreeComponent,
    AllLogsModalComponent
  ],
  templateUrl: './iis-info.component.html',
  styleUrl: './iis-info.component.less'
})
export class IisInfoComponent {
    @Input() projects: Project[] = [];
    @Input() projectsError: string = '';
    @Input() projectsLoading: boolean = false;
    @Input() expandedProject: Project | null = null;
    @Input() expandedDirectory: string | null = null;
    @Input() directoryContents: Record<string, LogDirectorie[]> = {};

    @Output() selectLogDirectory = new EventEmitter<{project: Project, name: string}>();
    @Output() toggleDirectory = new EventEmitter<string>();
    @Output() toggleProject = new EventEmitter<Project>();

    eventViewerLogs: LogEntity[] = [];
    
    selectedLog: LogEntity | null = null;
    isAllLogsModalOpen = false;

    constructor(private logService: LogService) {}

    onSelectLogDirectory(project: Project, name:string): void {
        this.selectLogDirectory.emit({ project, name });
    }

    onToggleDirectory(name: string): void{
        this.toggleDirectory.emit(name);
    }
    onToggleProject(project: Project): void{
        this.toggleProject.emit(project);
    }

    onLogFileSelected(event: { path: string; records: LogOfImpact[] }): void {
      const fileName = event.path.split(/[\\/]/).pop() ?? event.path;

      this.selectedLog = {
        title: fileName,
        fullText: event.records.map(record => record.text).join('\n'),
        type: LogType.Information,
        startDate: new Date(), //!
        endDate: new Date(), //!
        logOfImpactList: event.records
      };

      this.isAllLogsModalOpen = true;
    }

    closeAllLogs(): void {
      this.isAllLogsModalOpen = false;
    }

  loadEventViewerLogs(): void {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);

    this.logService.getEventViewerLogs(startDate.toISOString(),endDate.toISOString()).subscribe({
      next: (logs) => {
        this.eventViewerLogs = logs;

        const allRecords: LogOfImpact[] = logs.flatMap(log =>
          log.logOfImpactList.map(record => ({
            ...record,
            file: log.title
          }))
        );

        this.selectedLog = {
          title: 'Просмотр событий Windows',
          fullText: allRecords.map(record => record.text).join('\n'),
          type: LogType.Information,
          startDate: new Date(),
          endDate: new Date(),
          logOfImpactList: allRecords
        };

        this.isAllLogsModalOpen = true;
      },
      error: (error) => {
        console.error(
          'Ошибка загрузки событий Windows:',
          error
        );
      }
    });
  }
}