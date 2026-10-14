import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryTreeComponent } from '../directory-tree/directory-tree.component';
import { LogDirectorie, Project } from '../../models/project.models';


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
}