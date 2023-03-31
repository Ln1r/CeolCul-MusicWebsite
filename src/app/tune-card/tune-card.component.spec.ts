import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuneCardComponent } from './tune-card.component';

describe('TuneCardComponent', () => {
  let component: TuneCardComponent;
  let fixture: ComponentFixture<TuneCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuneCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
