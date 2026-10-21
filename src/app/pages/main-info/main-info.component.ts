import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogEntity, LogType } from '../../models/log.models';
import { AllLogsModalComponent } from '../all-logs-modal/all-logs-modal.component';

@Component({
  selector: 'app-main-info',
  standalone: true,
  imports: [CommonModule, AllLogsModalComponent],
  templateUrl: './main-info.component.html',
  styleUrl: './main-info.component.less'
})
export class MainInfoComponent {
    @Input() logs: LogEntity[] = [];
    @Input() errorMessage: string = "";
    @Input() url: string = "";
    @Input() loading: boolean = false;

    readonly LogType = LogType;
    expandedLogs = new Set<LogEntity>();
    selectedLogType: LogType | null = null;
    selectedLog: LogEntity | null = null;

    get filteredLogs(): LogEntity[] {
        if (this.selectedLogType === null) {
            return this.logs;
        }

        return this.logs.filter(
            log => log.type === this.selectedLogType
        );
    }

    showAllLogs(log: LogEntity): void {
        this.selectedLog = log;
    }

    closeAllLogs(): void {
        this.selectedLog = null;
    }

    filterByType(type: LogType | null): void {
        this.selectedLogType =
        this.selectedLogType === type ? null : type;
    }

    getCount(logType: LogType): number {
        return this.logs.filter(
            x => x.type === logType
        ).length;
    }

    toggleLogDetails(log: LogEntity): void {
        if (this.expandedLogs.has(log)) {
            this.expandedLogs.delete(log);
        } else {
            this.expandedLogs.add(log);
        }
    }

    isLogExpanded(log: LogEntity): boolean {
        return this.expandedLogs.has(log);
    }

}