import { Routes } from '@angular/router';
import { Form } from './pages/form/form';
import { Results } from './pages/results/results';

export const routes: Routes = [
  {
    path: '', component: Form
  },
  {
    path: 'results/:ver-resultados', component: Results
  }
];
