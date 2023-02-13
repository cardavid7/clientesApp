import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-CO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private getAllClientes: string = 'http://localhost:8080/api/clientes/responseEntity/getAllClientes';
  private createCliente: string = 'http://localhost:8080/api/clientes/responseEntity/createCliente';
  private getClienteById: string = 'http://localhost:8080/api/clientes/responseEntity/getClienteById/';
  private editClienteById: string = 'http://localhost:8080/api/clientes/responseEntity/editClienteById/';
  private deleteCliente: string = 'http://localhost:8080/api/clientes/responseEntity/deleteCliente/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.getAllClientes).pipe(
      //map((response: any) => response.data as Cliente[]),
      map((response: any) => {
        let clientes = response.data as Cliente[];
        return clientes.map(cliente => {
          cliente.nombres = cliente.nombres.toUpperCase();
          //cliente.apellidos = cliente.apellidos.toUpperCase(); | el uppercase se realiza en la vista por medio de pipe en clientes.component.html
          //cliente.createAt = formatDate(cliente.createAt, 'd MMMM, y', 'es-CO'); | el formato fecha se hace en la vista en clientes.component.html
          return cliente;
        });
      }),
      catchError(e => {
        console.log(e);
        if (e.status == 417) {
          Swal.fire(e.error.code, "No se pudo conectar con la base de datos clientes", 'error');
          return throwError(() => e.error.message);
        }
        Swal.fire(e.error.code, e.error.message, 'error');
        return throwError(() => e.error.message);
      })
    );
  }

  obtenerClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.getClienteById}${id}`).pipe(
      map((response: any) => response.data as Cliente),
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error);
        Swal.fire(e.error.code, e.error.message, 'error');
        return throwError(() => e.error.message);
      })
    );
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.createCliente, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.data as Cliente),
      catchError(e => {
        console.log(e.error);
        Swal.fire(e.error.code, e.error.message, 'error');
        return throwError(() => e.error.message);
      })
    );
  }

  actualizarCliente(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.editClienteById}${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error);
        Swal.fire(e.error.code, e.error.message, 'error');
        return throwError(() => e.error.message);
      })
    );
  }

  elimiarCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.deleteCliente}${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error);
        Swal.fire(e.error.code, e.error.message, 'error');
        return throwError(() => e.error.message);
      })
    );
  }

}
