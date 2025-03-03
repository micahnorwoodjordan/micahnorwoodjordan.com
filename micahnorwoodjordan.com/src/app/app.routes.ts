import { Routes } from '@angular/router';

import { AboutPageComponent } from '../components/about-page/about-page.component';
import { BlankComponent } from '../components/blank/blank.component';

export const routes: Routes = [
    {
        path: '',
        component: BlankComponent,
        title: 'Home'
    },
    {
        path: 'about',
        component: AboutPageComponent,
        title: 'About'
    }
];
