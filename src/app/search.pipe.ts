// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'search'
// })
// export class SearchPipe implements PipeTransform {
//   searchText:string
//   transform(values:any,search:string): any {
//     if (search) {
//       return values.filter(val => val.indexOf(search)) >= 0;
//     } else {
//       return values;
//     }
//   }

// }
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return item.data.title.toLowerCase().includes(searchText) ||
             item.data.category.category.toLowerCase().includes(searchText);
    });
  }
}
