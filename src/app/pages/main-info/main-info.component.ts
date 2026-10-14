import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExseptionLogsDTO, LogType } from '../../models/log.models';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-main-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-info.component.html',
  styleUrl: './main-info.component.less'
})
export class MainInfoComponent {
    @Input() logs: ExseptionLogsDTO[] = [];
    @Input() errorMessage: string = "";
    @Input() url: string = "";
    @Input() loading: boolean = false;

    constructor(private logService: LogService) {}
    readonly LogType = LogType;


    getCount(logType: LogType): number {
        return this.logs.filter(
            x => x.logType === logType
        ).length;
    }

}