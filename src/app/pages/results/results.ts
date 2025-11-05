import { Component, OnInit, signal } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Formulario {
  nombre: string;
  empresa: string;
  telefono: string;
  email: string;
  interes: string;
  feedback: {
    comentario: string;
    estrellas: number;
  }
}

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results implements OnInit {
  formularios = signal<Formulario[]>([]);
  loading = signal(true);

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const ref = collection(this.firestore, 'formularios');
    const obs: Observable<Formulario[]> = collectionData(ref, { idField: 'id' }) as Observable<Formulario[]>;

    obs.subscribe({
      next: data => {
        this.formularios.set(data);
        this.loading.set(false);
      },
      error: err => {
        console.error('Error al cargar formularios', err);
        this.loading.set(false);
      }
    });
  }
}
