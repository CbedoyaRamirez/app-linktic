import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCreateReservationComponent } from './modal-create-reservation.component';


describe('ModalUpdateMateriaComponent', () => {
  let component: ModalCreateReservationComponent;
  let fixture: ComponentFixture<ModalCreateReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
