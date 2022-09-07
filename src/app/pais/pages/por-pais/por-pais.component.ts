import { Component } from '@angular/core';
import { of } from 'rxjs';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles:[
    `
    li{
      cursor:pointer;
    }
    `
  ]
})
export class PorPaisComponent  {

  termino:string = '';
  hayError:boolean = false;
  paises:Country[]=[];
  paisesSugeridos:Country[]=[];
  mostrarSugerencias:boolean = false;


  constructor(private paisService:PaisService) { }

  buscar(termino:string){
    this.hayError = false;
    this.termino = termino;
    
    of(this.paisService.buscarPais(termino))
    .subscribe({
      next:(paises)=>{
        paises.subscribe({
          next:(pais)=>{        
            console.log(pais);
            this.paises = pais},
          error:(err)=>{
            this.hayError = true;
            this.paises = []}          
        })
      }
    })
  }

  sugerencias(termino:string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    
    this.paisService.buscarPais(termino)
    .subscribe(paises => this.paisesSugeridos = paises.splice(0,5)
    );
  }

  buscarSugerido(termino:string){
    this.buscar(termino);
  }

}
