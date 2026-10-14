import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-info.component.html',
  styleUrl: './header-info.component.less'
})
export class HeaderInfoComponent {
    @Input() isDarkTheme: boolean = false;
    @Input() projectsLoading: boolean = false;

    @Output() refreshProjects = new EventEmitter<void>();
    @Output() toggleTheme = new EventEmitter<void>();

    constructor() {}

    private hippoClickCount = 0;
    private hippoClickTimer: ReturnType<typeof setTimeout> | undefined;
    isHippoJumping = false;

    onRefreshProjects(): void {
        this.refreshProjects.emit();
    }

    onToggleTheme(): void{
        this.toggleTheme.emit();
    }

    onHippoClick(): void {
        this.hippoClickCount++;

        if (this.hippoClickTimer) {
            clearTimeout(this.hippoClickTimer);
        }

        if (this.hippoClickCount >= 3) {
            this.hippoClickCount = 0;
            this.playHippoSound();
            return;
        }

        this.hippoClickTimer = setTimeout(() => {
            this.hippoClickCount = 0;
        }, 600);
    }

    private playHippoSound(): void {
        const audio = this.isDarkTheme ? new Audio('/sounds/Hippo.mp3') : new Audio('/sounds/Horse.mp3');

        audio.play().catch(error => {
            console.error('Не удалось воспроизвести звук:', error);
        });
        this.isHippoJumping = false;

        setTimeout(() => {
            this.isHippoJumping = true;
        }, 0);

        setTimeout(() => {
            this.isHippoJumping = false;
        }, 2000);
    }
}