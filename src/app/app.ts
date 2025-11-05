import { Component, OnInit, signal } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  loading = false;
  success = false;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {}

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
      console.log("form", this.form.value);

    this.loading = true;
    try {
      const ref = collection(this.firestore, 'formularios');
      await addDoc(ref, this.form.value);
      this.success = true;
      this.form.reset();
    } catch (err) {
      console.error('Error al guardar en Firestore', err);
    } finally {
      this.loading = false;
    }
  }
}
