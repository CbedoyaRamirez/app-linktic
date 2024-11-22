import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalUpdateReservationComponent } from './modal-update-reservation.component';


describe('ModalUpdateMateriaComponent', () => {
  let component: ModalUpdateReservationComponent;
  let fixture: ComponentFixture<ModalUpdateReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
