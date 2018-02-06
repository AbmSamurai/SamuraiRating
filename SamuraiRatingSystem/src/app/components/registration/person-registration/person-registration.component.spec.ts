import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRegistrationComponent } from './person-registration.component';

describe('PersonRegistrationComponent', () => {
  let component: PersonRegistrationComponent;
  let fixture: ComponentFixture<PersonRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
