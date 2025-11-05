import { Component, OnInit, signal } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit{
  loading = false;
  success = false;

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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    try {
      const ref = collection(this.firestore, 'formularios');
      await addDoc(ref, this.form.value);
      this.router.navigate(['/gracias']); // redirige a otra ruta
    } catch (err) {
      console.error('Error al guardar en Firestore', err);
    } finally {
      this.loading = false;
    }
  }
}
