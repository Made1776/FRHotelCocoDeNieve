import { Component } from '@angular/core';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MdbCarouselModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  images = [
    '../../../../assets/img/carousel_3.webp',
    '../../../../assets/img/carousel_2.png',
    '../../../../assets/img/carousel_1.png'
  ];

}
