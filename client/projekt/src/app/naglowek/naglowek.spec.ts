import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Naglowek } from './naglowek';

describe('Naglowek', () => {
  let component: Naglowek;
  let fixture: ComponentFixture<Naglowek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Naglowek]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Naglowek);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
