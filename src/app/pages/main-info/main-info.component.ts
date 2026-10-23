import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogEntity, LogType } from '../../models/log.models';
import { AllLogsModalComponent } from '../all-logs-modal/all-logs-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-info',
  standalone: true,
  imports: [
    CommonModule, 
    AllLogsModalComponent, 
    FormsModule
  ],
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
    searchText = '';
    sortField: 'startDate' | 'endDate' = 'endDate';
    sortDirection: 'asc' | 'desc' = 'desc';
    filtersVisible = false;

    get filteredLogs(): LogEntity[] {
        const search = this.searchText.trim().toLocaleLowerCase();

        return this.logs
            .filter(log => {
                if (
                    this.selectedLogType !== null &&
                    log.type !== this.selectedLogType
                ) {
                    return false;
                }

                if (search) {
                    const title = (log.title ?? '').toLocaleLowerCase();
                    const fullText = (log.fullText ?? '').toLocaleLowerCase();

                    if (!title.includes(search) && !fullText.includes(search)) {
                        return false;
                    }
                }

                return true;
            })
            .sort((a, b) => {
                const dateA = new Date(a[this.sortField]).getTime();
                const dateB = new Date(b[this.sortField]).getTime();

                const timeA = Number.isNaN(dateA) ? 0 : dateA;
                const timeB = Number.isNaN(dateB) ? 0 : dateB;

                return this.sortDirection === 'asc'
                    ? timeA - timeB
                    : timeB - timeA;
            });
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

    resetFilters(): void {
        this.searchText = '';
        this.selectedLogType = null;
        this.sortField = 'endDate';
        this.sortDirection = 'desc';
    }

}