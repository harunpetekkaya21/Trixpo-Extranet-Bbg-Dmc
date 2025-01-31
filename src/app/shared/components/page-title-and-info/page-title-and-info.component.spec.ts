import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTitleAndInfoComponent } from './page-title-and-info.component';

describe('PageTitleAndInfoComponent', () => {
  let component: PageTitleAndInfoComponent;
  let fixture: ComponentFixture<PageTitleAndInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTitleAndInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageTitleAndInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
