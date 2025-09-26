import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  activeSection: string = 'about';

  constructor() {}

  ngOnInit(): void {
    this.setActiveSection('about'); // Default to home
  }

  ngOnDestroy(): void {
    
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
    const scrollPosition = window.scrollY + 100;

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
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
