import { Component, signal } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gracias',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gracias.html',
  styleUrl: './gracias.scss',
})
export class Gracias {
  // signals para estado
  formId = signal<string | null>(null);
  estrellas = signal(0);
  comentario = signal('');
  loading = signal(false);
  enviado = signal(false);
  showEstrellas = signal(true);

  constructor(private firestore: Firestore, private route: ActivatedRoute, private router: Router) {
    // reaccionamos al parámetro de ruta
    const id = this.route.snapshot.paramMap.get('id');
    this.formId.set(id);
  }

  async enviarFeedback() {
    if (!this.formId()) return;
    this.loading.set(true);
    try {
      const ref = doc(this.firestore, 'formularios', this.formId()!);
      await updateDoc(ref, {
        feedback: {
          estrellas: this.estrellas(),
          comentario: this.comentario()
        }
      });
      this.enviado.set(true);
      this.showEstrellas.set(false);
    } catch (err) {
      console.error('Error al enviar feedback', err);
    } finally {
      this.loading.set(false);
      this.estrellas.set(0);
      this.comentario.set('');
    }
  }

  volverInicio() {
    this.router.navigate(['/']);
  }
}
