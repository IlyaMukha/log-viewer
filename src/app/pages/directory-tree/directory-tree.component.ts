import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../services/log.service';
import { LogDirectorie } from '../../models/project.models';
import { LogRequestDto } from '../../models/requests.models';

@Component({
  selector: 'app-directory-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './directory-tree.component.html',
  styleUrl: './directory-tree.component.less'
})
export class DirectoryTreeComponent {
  @Input() items: LogDirectorie[] = [];

  @Output() directorySelected = new EventEmitter<string>();
  @Output() fileSelected = new EventEmitter<LogRequestDto>();
  
  constructor(private logService: LogService) {}

  expanded: Record<string, boolean> = {};
  contents: Record<string, LogDirectorie[]> = {};
  loading: Record<string, boolean> = {};

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
    const request: LogRequestDto = {
          url: path,
    };
    this.fileSelected.emit(request);
  }

  onFolderClick(path: string): void {
    this.directorySelected.emit(path);
  }
}