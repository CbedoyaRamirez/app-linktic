import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/shared/interfaces/IReservation';
import Swal from 'sweetalert2'
import { ReservationService } from 'src/services/consultReservation.services';
import { ModalUpdateReservationComponent } from './modal-update-reservation/modal-update-reservation.component';
import { ModalCreateReservationComponent } from './modal-create-reservation/modal-create-reservation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listReservation: Reservation[];
  isChecked: boolean = false;
  cedula: string = '';
  name: string = '';
  loading: boolean = false;

  constructor(private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute,
    private __dialog: MatDialog
  ) {

    this.route.paramMap.subscribe(params => {
      this.cedula = String(params.get('cedula'));
      this.name = String(params.get('name'));
    });
  }

  ngOnInit(): void {
    this.getReservations();

  }

  getReservations() {
    this.reservationService.getReservation().subscribe({
      next: (data) => {
        this.listReservation = data;
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          text: "Error consultando las reservaciones",
        });
      }
    })
  }

  createReservetion(){
    const dialogRef = this.__dialog.open(ModalCreateReservationComponent, {
      width: '50%',
      height: '60%',
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
      this.getReservations();
    })
  }

  openModalUpdate(item: Reservation) {
    const dialogRef = this.__dialog.open(ModalUpdateReservationComponent, {
      width: '50%',
      height: '60%',
      data: item,
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
      this.getReservations();
    })
  }

  deleteSelection(event: Reservation){
    Swal.fire({
      title: "Desea eliminar esta reservación?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`
    }).then((result) => {

      if (result.isConfirmed) {
        this.reservationService.deleteReservation(Number(event.id)).subscribe({
          next: (data) => {
            this.getReservations();
          },
          error: (error) => {
            Swal.fire({
              icon: "error",
              text: "Error eliminando la reservacion",
            });
          }
        })

      } else if (result.isDenied) {
        Swal.fire("Reservacion no eliminada", "", "info");
      }
    });
  }

  exit() {
    this.router.navigate(['']);
  }

}
