import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from '../api/models';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-advertisement',
  templateUrl: './create-advertisement.component.html',
  styleUrls: ['./create-advertisement.component.scss']
})
export class CreateAdvertisementComponent implements OnInit {

  showDeactivationAdvertisement = false;
  currentUserAd: Advertisement = {
    id: ""
  }

  constructor(public dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getAdvertisementsByUser();
  }

  loadMoreAdvertisements(){
    this.dataService.currentAdvertisementLimit += 30;
    this.dataService.getAdvertisementsByUser();
    // consume active placement bonus from dataService promise
  }

  save(){
    this.router.navigate(['save'], {relativeTo:this.route});
  }

  edit(advertisementId: string){
    this.router.navigate(['update/' + advertisementId], {relativeTo:this.route});
  }

  showDeactiveAdvertisement(userAd: Advertisement){
    this.currentUserAd = userAd;
    this.showDeactivationAdvertisement = true;
  }

  deactiveAdvertisement(){
    this.dataService.deactivateAdvertisement(this.currentUserAd); 
    this.showDeactivationAdvertisement = false;
  }
}
