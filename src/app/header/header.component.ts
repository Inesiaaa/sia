import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  activeSection: string = 'about';
  private readonly headerOffset = 50; // Increased to account for fixed navigation height
  isDarkMode = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.setActiveSection('about'); // Default to home
    this.initializeTheme();
  }

  ngOnDestroy(): void {
    
  }

  private initializeTheme(): void {
    // Only run in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Check for saved theme preference or default to light
      const savedTheme = localStorage.getItem('theme') || 'light';
      this.isDarkMode = savedTheme === 'dark';
      this.setTheme(savedTheme as 'light' | 'dark');
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    const newTheme = this.isDarkMode ? 'dark' : 'light';
    this.setTheme(newTheme);
    
    // Only save to localStorage in browser environment
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', newTheme);
    }
  }

  private setTheme(theme: 'light' | 'dark'): void {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.setAttribute('data-theme', theme);
    }
    // Also set on document root for global access
    document.documentElement.setAttribute('data-theme', theme);
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const sections = ['about', 'experiences', 'featured-projects'];
    const scrollPosition = window.scrollY + this.headerOffset + 50;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;

        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          this.activeSection = section;
          break;
        }
      }
    }

    if (window.scrollY < 100) {
      this.activeSection = 'about';
    }
  }

  onNavClick(section: string, event: Event): void {
    event.preventDefault();
    this.setActiveSection(section);
    
    if (section === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
}