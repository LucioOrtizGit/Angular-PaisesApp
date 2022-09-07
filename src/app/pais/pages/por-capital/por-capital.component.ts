import { Component} from '@angular/core';
import { of } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent {

  termino:string = '';
  hayError:boolean = false;
  paises:Country[]=[];

  constructor(private paisService:PaisService) { }

  buscar(termino:string){
    this.hayError = false;
    this.termino = termino;
    
    of(this.paisService.buscarCapital(termino))
    .subscribe({
      next:(paises)=>{
        paises.subscribe({
          next:(pais)=>{        
            this.paises = pais},
          error:(err)=>{
            this.hayError = true;
            this.paises = []}          
        })
      }
    })
  }

}
