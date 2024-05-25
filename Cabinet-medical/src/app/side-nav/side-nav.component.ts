import { Component } from '@angular/core';
import { SideNavItem } from '../models/models';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  sideNavContent: SideNavItem[] = [
    {
      title: 'Dashboard',
      link: 'site/dashboard',
    },
    {
      title: 'Manage medicaments',
      link: 'site/Medicament',
    },
    {
      title: 'View category',
      link: 'site/category',
    },
    {
      title: 'Manage patients',
      link: 'site/patients',
    },
    {
      title: 'Logout',
      link: 'login',
    },
    
    
  ];
}
