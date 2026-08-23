import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'sfeir-signal-form',
  templateUrl: './signal-form.html',
  styleUrl: 'signal-form.scss',
  imports: [FormsModule, MatButton, MatFormField, MatInput, MatLabel, NgOptimizedImage],
})
export class SignalForm {}
