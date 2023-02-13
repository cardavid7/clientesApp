import { ɵAnimationGroupPlayer } from '@angular/animations';
import { Component } from '@angular/core';
import { toArray } from 'rxjs';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => { this.clientes = clientes }
    );
  }

  deleteCliente(cliente: Cliente): void {
    Swal.fire({
      title: 'Eliminar Cliente',
      text: `Estás seguro que quieres eliminar al Cliente ${cliente.nombres} ${cliente.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Elimnar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.elimiarCliente(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)

            Swal.fire(
              'Cliente Eliminado',
              `Cliente ${cliente.nombres} ${cliente.apellidos} ha sido eliminado con exito`,
              'success')
          }
        )
      }
    })
  }

}
