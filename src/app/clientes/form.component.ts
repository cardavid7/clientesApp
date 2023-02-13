import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent {
  title: string = 'Crear Cliente';
  cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarCliente()
  }

  cargarCliente(): void {
    this.activedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.obtenerClientePorId(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  createCliente(): void {
    this.clienteService.crearCliente(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente Creado', `Cliente ${cliente.nombres} ${cliente.apellidos} creado con exito!`, 'success')
      }
    )
  }

  updateCliente() {
    this.clienteService.actualizarCliente(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente Actualizado', `Cliente ${json.data.nombres} ${json.data.apellidos} actualizado con exito!`, 'success')
      })
  }

}
