import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryTreeComponent } from '../directory-tree/directory-tree.component';
import { LogDirectorie, Project } from '../../models/project.models';
import { LogEntity } from '../../models/log.models';
import { LogService } from '../../services/log.service';
import { LogRequestDto } from '../../models/requests.models';

@Component({
  selector: 'app-iis-info',
  standalone: true,
  imports: [
    CommonModule, 
    DirectoryTreeComponent
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

    @Output() directoryTreeRefresh = new EventEmitter();
    @Output() logEventViwerSelected = new EventEmitter();
    @Output() logDirectorySelected = new EventEmitter<string>();
    @Output() logFileSelected = new EventEmitter<LogRequestDto>();
    @Output() selectLogDirectory = new EventEmitter<{name: string}>();
    @Output() toggleDirectory = new EventEmitter<string>();
    @Output() toggleProject = new EventEmitter<Project>();

    @ViewChild(DirectoryTreeComponent)
    directoryTree?: DirectoryTreeComponent;

    eventViewerLogs: LogEntity[] = [];
    
    selectedLog: LogEntity | null = null;

    

    constructor(private logService: LogService) {}

    onSelectLogDirectory(name:string): void {
        this.selectLogDirectory.emit({ name });
    }

    onToggleDirectory(name: string): void{
        this.toggleDirectory.emit(name);
    }
    onToggleProject(project: Project): void{
        this.toggleProject.emit(project);
    }

    onLogFileSelected(event: LogRequestDto): void {
      this.logFileSelected.emit(event);
    }

    onLogDirectorySelected(event: string): void {
      this.logDirectorySelected.emit(event);
    }

    loadEventViewerLogs(): void {
      this.logEventViwerSelected.emit();
    }

    clearContents(): void {
      this.directoryTreeRefresh.emit();
      this.directoryTree?.refreshContents();
    }
}