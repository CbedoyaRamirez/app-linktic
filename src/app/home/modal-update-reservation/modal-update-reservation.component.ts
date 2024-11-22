import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from 'src/services/consultReservation.services';
import { Reservation } from 'src/shared/interfaces/IReservation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-update-reservation',
  templateUrl: './modal-update-reservation.component.html',
  styleUrls: ['./modal-update-reservation.component.scss'],
})
export class ModalUpdateReservationComponent implements OnInit {
  id: number;
  idcliente: number;
  datereservation: string;
  status: number;
  numPerson: number;
  observations: string;

  constructor(
    private dialogRef: MatDialogRef<ModalUpdateReservationComponent>,
    private reservationService: ReservationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Reservation,
  ) {
    this.id = Number(data['id']);
    this.idcliente = Number(data['idcliente']);
    this.datereservation = String(data['datereservation']);
    this.status = Number(data['status']);
    this.observations = String(data['obervations']);
    this.numPerson = Number(data['numPerson']);
  }

  ngOnInit(): void {}

  catchrNumberID(event: Event) {
    const valueTarget = event.target as HTMLInputElement;
    this.idcliente = Number(valueTarget.value);
  }

  catchDate(event: Event) {
    const valueTarget = event.target as HTMLInputElement;
    this.datereservation = String(valueTarget.value);
  }

  catchObservation(event: Event) {
    const valueTarget = event.target as HTMLInputElement;
    this.observations = String(valueTarget.value);
  }
  catchNumPerson(event: Event) {
    const valueTarget = event.target as HTMLInputElement;
    this.numPerson = Number(valueTarget.value);
  }

  async update() {
    let itemReservation:Reservation;
    itemReservation = {
      "id":this.id,
      "idcliente": this.idcliente,
      "datereservation": this.datereservation,
      "obervations": this.observations,
      "numPerson": this.numPerson,
      "status": 1
    }
    await this.reservationService.updateReservation(itemReservation).subscribe({
      next:(data) => {
        Swal.fire({
          icon: "success",
          text: "Reservacion actualizada exitosamente",
        });
      }, error: (error) => {
        Swal.fire({
          icon: "error",
          text: "Error actualizando la reserva",
        });
      }
    })
  }

  salir() {
    this.dialogRef.close();
  }
}
