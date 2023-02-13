import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    public autor: any = { nombre: 'Carlos', apellido: 'Serrano' };
    yearIni: number = 2023;
    yearNow: number = new Date().getFullYear();

}