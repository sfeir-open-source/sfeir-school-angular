import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'sfeir-template-form',
  templateUrl: './template-form.html',
  styleUrl: 'template-form.scss',
  imports: [FormsModule, MatButton, MatFormField, MatInput, MatLabel, NgOptimizedImage],
})
export class TemplateForm {}
