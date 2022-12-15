import { Injectable } from '@angular/core';
import { Advertisement, District } from './api/models';
import { AdvertisementService, DistrictService } from './api/services';
import { UsersPermissionsUserService } from './api/services';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public totalAdvertisementAmount: number = 0;
  public totalAdvertisement: Advertisement[] = [];
  public currentLimit: number = 50;
  public displayedAdvertisements: Advertisement[] = [];
  public districts: District[] = [];
  public advertisementProfile: Advertisement = {
    id: "",
  };

  private authParams: any = {
    "body": {
      "identifier": "contact@fronius.at",
      "password": "Hello1234"
    }
  }

  constructor(
    private advertisementService: AdvertisementService, 
    private districtService: DistrictService,
    private userPermissionService: UsersPermissionsUserService) { }

  authenticateDevCompany() {
    this.userPermissionService.authLocalPost(this.authParams).subscribe(
      (data: any) => {
        console.log(data.jwt);
        localStorage.setItem('jwt_token', data.jwt);
        localStorage.setItem('jwt_user', data.user);
      }
    )
  }

  getAmountOfAdvertisements() {
    this.advertisementService.advertisementsGet({_limit: -1}).subscribe(
      (data: Advertisement[]) => {
        this.totalAdvertisement = data;
        this.totalAdvertisementAmount = data.length;
      }
    );
  }

  getAdvertisements() {
    this.advertisementService.advertisementsGet({_limit: this.currentLimit}).subscribe(
      (data: Advertisement[]) => {
        this.displayedAdvertisements = data;
        this.advertisementProfile = data[0];
      }
    );
  }

  getDistricts() {
    this.districtService.districtsGet().subscribe(
      (data: any) => {
        this.districts = data;
      }
    );
  }

}
