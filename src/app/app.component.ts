import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { AboutComponent } from './about/about.component';
import { SkillsAndAbilitiesComponent } from './skills-and-abilities/skills-and-abilities.component';
import { FeaturedProjectsComponent } from './featured-projects/featured-projects.component';
import { FooterComponent } from './footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    BannerComponent,
    AboutComponent,
    SkillsAndAbilitiesComponent,
    FeaturedProjectsComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sia-portfolio';
}
