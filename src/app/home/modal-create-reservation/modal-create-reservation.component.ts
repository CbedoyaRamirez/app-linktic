import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from 'src/services/consultReservation.services';
import { Reservation } from 'src/shared/interfaces/IReservation';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-create-reservation',
  templateUrl: './modal-create-reservation.component.html',
  styleUrls: ['./modal-create-reservation.component.scss']
})
export class ModalCreateReservationComponent implements OnInit {

  id: number ;
  numberId: number;
  dateReservation: string;
  observation: string;
  numPerson: number;

  constructor(private dialogRef: MatDialogRef<ModalCreateReservationComponent>,
    private reservationService: ReservationService
    ) { 
    
  }

  ngOnInit(): void {
  }

  catchrNumberID(event: Event) {
    const valueTarget = event.target as HTMLInputElement;
    this.numberId = Number(valueTarget.value);
  }

  catchDate(event: Event) {
    const valueTarget = event.target as HTMLInputElement;
    this.dateReservation = String(valueTarget.value);
  }

  catchObservation(event: Event) {
    const valueTarget = event.target as HTMLInputElement;
    this.observation = String(valueTarget.value);
  }
  catchNumPerson(event: Event) {
    const valueTarget = event.target as HTMLInputElement;
    this.numPerson = Number(valueTarget.value);
  }

  async create() {
    let itemReservation:Reservation;
    itemReservation = {
      "idcliente": this.numberId,
      "datereservation": this.dateReservation,
      "obervations": this.observation,
      "numPerson": this.numPerson,
      "status": 1
    }
    await this.reservationService.createReservation(itemReservation).subscribe({
      next:(data) => {
        Swal.fire({
          icon: "success",
          text: "Reservacion creada exitosamente",
        });
      }, error: (error) => {
        Swal.fire({
          icon: "error",
          text: "Error creando la reserva",
        });
      }
    })
  }

  salir() {
    this.dialogRef.close()
  }

}
