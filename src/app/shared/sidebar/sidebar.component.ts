import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get history(){
    return this.gifService.history;
  }

  constructor (private gifService: GifsService) {}

  search(term: string){
    this.gifService.searchGifs(term);
  }
}
