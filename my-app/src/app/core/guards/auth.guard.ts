import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export function authGuard(): CanActivateFn {
  return () => {
    const router: Router = inject(Router)
    if (localStorage.getItem("token")) {
        return true;
    }
    router.navigate(['']);
    return false;
  }
}