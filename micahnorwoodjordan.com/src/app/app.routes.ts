import { Routes } from '@angular/router';

import { HomepageComponent } from '../components/homepage/homepage.component';
import { AboutPageComponent } from '../components/about-page/about-page.component';

export const routes: Routes = [
    { path: 'home', component: HomepageComponent },
    { path: 'about', component: AboutPageComponent }
];
