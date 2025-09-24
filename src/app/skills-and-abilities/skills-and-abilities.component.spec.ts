import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsAndAbilitiesComponent } from './skills-and-abilities.component';

describe('SkillsAndAbilitiesComponent', () => {
  let component: SkillsAndAbilitiesComponent;
  let fixture: ComponentFixture<SkillsAndAbilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsAndAbilitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillsAndAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
