import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stopka } from './stopka';

describe('Stopka', () => {
  let component: Stopka;
  let fixture: ComponentFixture<Stopka>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stopka]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stopka);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
