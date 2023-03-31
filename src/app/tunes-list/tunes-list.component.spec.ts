import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuneListComponent } from './tunes-list.component';

describe('TuneListComponent', () => {
  let component: TuneListComponent;
  let fixture: ComponentFixture<TuneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuneListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
