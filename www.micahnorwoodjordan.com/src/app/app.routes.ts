import { Routes } from '@angular/router';

import { AboutPageComponent } from './components/about-page/about-page.component';
import { IndexComponent } from './components/index/index.component';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';

export const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        title: 'Home'
    },
    {
        path: 'about',
        component: AboutPageComponent,
        title: 'About'
    },
    {
        path: 'projects',
        component: ProjectsPageComponent,
        title: 'Projects'
    }
];
