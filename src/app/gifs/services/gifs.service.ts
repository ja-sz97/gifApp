import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'CQ0T5fhFTixTyyamFglkDP7kAvHRJlYc';
  private url: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  // TODO: cambiar any por su tipo correspondiente
  public results: Gif[] = [];

  //se retorna con ... para que no se modifique el valor x referencia
  get history(){
    return [...this._history];
  }

  constructor( private http: HttpClient ){

    if (localStorage.getItem('historial')){
      this._history = JSON.parse(localStorage.getItem('historial')!)
    }
    if (localStorage.getItem('results')){
      this.results = JSON.parse(localStorage.getItem('results')!)
    }
  }


  searchGifs( query: string='' ){
    //unshift inserta el valor buscado al inicio del arreglo
    
    query = query.trim().toLowerCase();

    if (!this._history.includes(query)){
      this._history.unshift(query);
      this._history = this._history.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._history))

    }

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.url}/search`,{params})
      .subscribe( (resp) => {
        //console.log(resp.data);
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results))

      } )

    //console.log(this._history);
  }

}
