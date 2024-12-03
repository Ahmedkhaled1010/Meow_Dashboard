import { CanActivateFn, Router } from '@angular/router';
import { DataService } from './data.service';
import { inject } from '@angular/core';

export const authguardGuard: CanActivateFn = (route, state) => {
  let _Router :Router=  inject(Router);

  let _DataService:DataService =inject(DataService);
  if(sessionStorage.getItem("userToken") ==null)
    {
      _Router.navigate(['/login'])
      return false;

    }
    else
    {
      _DataService.saveUserData();
      return true;
    }
};
