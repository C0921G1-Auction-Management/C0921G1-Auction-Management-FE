
import { Component } from '@angular/core';
import { LoadCssService } from './load-css.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angular-chat';




  title1 = 'auction-fe';

  constructor(private loadCssServiceService: LoadCssService) {
    this.loadCssServiceService.loadCss('https://fonts.googleapis.com');
    this.loadCssServiceService.loadCss('https://fonts.gstatic.com');
    this.loadCssServiceService.loadCss('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Nunito:wght@200&display=swap');
    this.loadCssServiceService.loadCss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css');
    this.loadCssServiceService.loadCss('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css');
    this.loadCssServiceService.loadCss('assets/lib/animate/animate.min.css');
    this.loadCssServiceService.loadCss('assets/lib/owlcarousel/assets/owl.carousel.min.css');
    this.loadCssServiceService.loadCss('assets/lib/slick-1.8.1/slick/slick.css');
    this.loadCssServiceService.loadCss('assets/lib/slick-1.8.1/slick/slick-theme.css');
    this.loadCssServiceService.loadCss('assets/lib/fontawesome-free-6.1.1-web/css/all.min.css');
    this.loadCssServiceService.loadCss('assets/css/style.css');
    this.loadCssServiceService.loadCss('assets/css/DatTC-customCSS.css');
    this.loadCssServiceService.loadScript('https://code.jquery.com/jquery-3.4.1.min.js');
    this.loadCssServiceService.loadScript('assets/lib/wow/wow.min.js');
    this.loadCssServiceService.loadScript('assets/lib/easing/easing.min.js');
    this.loadCssServiceService.loadScript('assets/lib/waypoints/waypoints.min.js');
    this.loadCssServiceService.loadScript('assets/lib/owlcarousel/owl.carousel.min.js');
    this.loadCssServiceService.loadScript('assets/lib/slick-1.8.1/slick/slick.min.js');
    this.loadCssServiceService.loadScript('assets/lib/fontawesome-free-6.1.1-web/js/all.min.js');
    this.loadCssServiceService.loadScript('assets/js/main.js');
    this.loadCssServiceService.loadScript('assets/js/DatTC-customJS.js');
  }

}
