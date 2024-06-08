// word-slice.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordSlice'
})
export class WordSlicePipe implements PipeTransform {
  transform(value: string, wordLimit: number): string {
    if (!value) return '';
    
    const words = value.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : value;
  }
}
