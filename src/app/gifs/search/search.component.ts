import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent{

  //estoy recibiendo el valor del input para luego trabajarlo con JS
  @ViewChild('txtSearch') txtSearch!:ElementRef<HTMLInputElement>;


  //Constructor que permite utilizar todo de gifs.services
  constructor (private gifsService: GifsService) {}

  search(){
    //guarda el valor de la caja de texto cuando se pulsa la tecla enter
    const value = this.txtSearch.nativeElement.value;
    //console.log(value);

    //le envia el valor de la caja de texto a la funcion search que esta en services
    if (value.trim().length===0){
      return;
    }
    this.gifsService.searchGifs (value);

    //para que la caja de texto quede vacia
    this.txtSearch.nativeElement.value='';
  }
}
