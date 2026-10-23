import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogEntity, LogOfImpact } from '../../models/log.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-logs-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './all-logs-modal.component.html',
  styleUrl: './all-logs-modal.component.less'
})

export class AllLogsModalComponent {
    @Input() selectedLog: LogEntity | null = null;
    @Output() closeAllLogs = new EventEmitter<void>();

    searchText = '';
    dateFrom = '';
    dateTo = '';
    filtersVisible = false;

    private expandedRecords = new Set<LogOfImpact>();

    toggleRecordText(record: LogOfImpact): void {
        if (this.expandedRecords.has(record)) {
            this.expandedRecords.delete(record);
        } else {
            this.expandedRecords.add(record);
        }
    }

    isRecordTextVisible(record: LogOfImpact): boolean {
        return this.expandedRecords.has(record);
    }

    get filteredLogs(): LogOfImpact[] {
        if (!this.selectedLog) {
            return [];
        }

        const search = this.searchText.trim().toLocaleLowerCase();

        return this.selectedLog.logOfImpactList.filter(record => {
            if (search && !record.text.toLocaleLowerCase().includes(search)) {
                return false;
            }

            const timestamp = new Date(record.time).getTime();

            if (Number.isNaN(timestamp)) {
                return !this.dateFrom && !this.dateTo;
            }

            if (this.dateFrom) {
                const from = new Date(this.dateFrom).getTime();

                if (timestamp < from) {
                    return false;
                }
            }

            if (this.dateTo) {
                const to = new Date(this.dateTo).getTime() + 60_000 - 1;

                if (timestamp > to) {
                    return false;
                }
            }

            return true;
        });
    }

    resetFilters(): void {
        this.searchText = '';
        this.dateFrom = '';
        this.dateTo = '';
    }

    toggleFilters(): void {
        this.filtersVisible = !this.filtersVisible;
    }

    onCloseAllLogs(): void {
        this.closeAllLogs.emit();
    }
}