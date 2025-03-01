import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoutingContainerComponent } from './index.component';

describe('AppRoutingContainerComponent', () => {
  let component: AppRoutingContainerComponent;
  let fixture: ComponentFixture<AppRoutingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRoutingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
