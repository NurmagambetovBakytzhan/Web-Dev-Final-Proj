import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsChangeComponent } from './movie-details-change.component';

describe('MovieDetailsChangeComponent', () => {
  let component: MovieDetailsChangeComponent;
  let fixture: ComponentFixture<MovieDetailsChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailsChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
