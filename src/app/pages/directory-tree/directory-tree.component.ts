import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogDirectorie } from '../../models/log.models';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-directory-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './directory-tree.component.html',
  styleUrl: './directory-tree.component.less'
})
export class DirectoryTreeComponent {
  @Input() items: LogDirectorie[] = [];

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
}