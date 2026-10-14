import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogEntry, LogType } from '../../models/log.models';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-main-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-info.component.html',
  styleUrl: './main-info.component.less'
})
export class MainInfoComponent {
    @Input() logs: LogEntry[] = [];
    @Input() errorMessage: string = "";
    @Input() url: string = "";
    @Input() loading: boolean = false;

    readonly LogType = LogType;
    expandedLogs = new Set<LogEntry>();
    selectedLogType: LogType | null = null;

    get filteredLogs(): LogEntry[] {
        if (this.selectedLogType === null) {
            return this.logs;
        }

        return this.logs.filter(
            log => log.type === this.selectedLogType
        );
    }

    // Переключение фильтра.
    filterByType(type: LogType | null): void {
        this.selectedLogType =
        this.selectedLogType === type ? null : type;
    }

    getCount(logType: LogType): number {
        return this.logs.filter(
            x => x.type === logType
        ).length;
    }

    toggleLogDetails(log: LogEntry): void {
        if (this.expandedLogs.has(log)) {
            this.expandedLogs.delete(log);
        } else {
            this.expandedLogs.add(log);
        }
    }

    isLogExpanded(log: LogEntry): boolean {
        return this.expandedLogs.has(log);
    }

}