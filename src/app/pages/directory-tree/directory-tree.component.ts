import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../services/log.service';
import { LogDirectorie } from '../../models/project.models';
import { LogRecord } from '../../models/log.models';

@Component({
  selector: 'app-directory-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './directory-tree.component.html',
  styleUrl: './directory-tree.component.less'
})
export class DirectoryTreeComponent {
  @Input() items: LogDirectorie[] = [];

  @Output() fileSelected = new EventEmitter<{ path: string; records: LogRecord[]; }>();

  constructor(private logService: LogService) {}

  expanded: Record<string, boolean> = {};
  contents: Record<string, LogDirectorie[]> = {};
  loading: Record<string, boolean> = {};

  selectedFile: string | null = null;
  fileLoading: Record<string, boolean> = {};

  toggleDirectory(path: string): void {
    if (this.expanded[path]) {
      this.expanded[path] = false;
      return;
    }

    this.expanded[path] = true;

    if (this.contents[path]) {
      return;
    }

    this.loading[path] = true;

    this.logService.getFiles(path).subscribe({
      next: (result) => {
        this.contents[path] = result;
        this.loading[path] = false;
      },
      error: (error) => {
        console.error('Ошибка загрузки папки:', error);
        this.loading[path] = false;
        this.expanded[path] = false;
      }
    });
  }

   onFileClick(path: string): void {
    this.selectedFile = path;
    this.fileLoading[path] = true;

    this.logService.getLogFile(path).subscribe({
      next: (records) => {
        this.fileLoading[path] = false;
        this.fileSelected.emit({ path, records });
      },
      error: (error) => {
        console.error('Ошибка чтения файла:', error);
        this.fileLoading[path] = false;
      }
    });
  }
}