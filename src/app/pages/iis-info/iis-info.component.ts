import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryTreeComponent } from '../directory-tree/directory-tree.component';
import { LogDirectorie, Project } from '../../models/project.models';
import { LogEntry, LogRecord, LogType } from '../../models/log.models';
import { AllLogsModalComponent } from '../all-logs-modal/all-logs-modal.component';


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

    constructor() {}

    onSelectLogDirectory(project: Project, name:string): void {
        this.selectLogDirectory.emit({ project, name });
    }

    onToggleDirectory(name: string): void{
        this.toggleDirectory.emit(name);
    }
    onToggleProject(project: Project): void{
        this.toggleProject.emit(project);
    }

    selectedLog: LogEntry | null = null;
    isAllLogsModalOpen = false;

    onLogFileSelected(event: { path: string; records: LogRecord[] }): void {
      const fileName = event.path.split(/[\\/]/).pop() ?? event.path;

      this.selectedLog = {
        title: fileName,
        fullText: event.records.map(record => record.text).join('\n'),
        type: LogType.Information, // Замени на подходящее значение своего LogType
        allLogs: event.records
      };

      this.isAllLogsModalOpen = true;
    }

    closeAllLogs(): void {
      this.isAllLogsModalOpen = false;
    }
}