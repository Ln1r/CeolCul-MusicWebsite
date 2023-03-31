import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTuneComponent } from './add-tune.component';

describe('AddTuneComponent', () => {
  let component: AddTuneComponent;
  let fixture: ComponentFixture<AddTuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTuneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
