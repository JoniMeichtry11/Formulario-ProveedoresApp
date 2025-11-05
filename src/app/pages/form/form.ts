import { Component, OnInit, signal } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit {
  loading = signal(false);
  success = signal(false);

  form!: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      empresa: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      interes: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    try {
      const ref = collection(this.firestore, 'formularios');
      const docRef = await addDoc(ref, this.form.value);

      this.success.set(true);
      this.router.navigate(['/gracias', docRef.id]);
    } catch (error) {
      console.error('Error al guardar el formulario', error);
    } finally {
      this.loading.set(false);
    }
  }
}
