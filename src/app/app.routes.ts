import { Routes } from '@angular/router';
import { Form } from './pages/form/form';
import { Results } from './pages/results/results';
import { Gracias } from './pages/gracias/gracias';

export const routes: Routes = [
  {
    path: '', component: Form
  },
  {
    path: 'results/:ver-resultados', component: Results
  },
  { path: 'gracias/:id', component: Gracias },
  { path: '**', redirectTo: '' }
];
