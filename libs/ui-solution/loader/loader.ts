import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'sfeir-loader',
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  public readonly isLoading = input<boolean>(true, { transform: booleanAttribute });
}
