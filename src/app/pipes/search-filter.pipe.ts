import { Pipe, PipeTransform } from '@angular/core';
import { ICryptoObject } from '../interfaces/IcryptoObject';

@Pipe({ name: 'searchfilter' })
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, search: any) {
    if ((search || search !== '') && (value !== undefined)) {
      if (search === undefined) {
        search = '';
      }
      search = search.toString().toLowerCase();
      return value.filter((elem: ICryptoObject) => {
        let elemAux = {
          id: 0,
          name: elem.name,
          code: elem.code
        }
        let contains: Boolean = false;
        elem = elemAux;
        for (const prop in elem) {
          if (elem[prop] !== null) {
            if (elem[prop].toString().toLowerCase().indexOf(search) > -1) {
              contains = true;
            }
          }
        }
        return contains ? elem : undefined;
      });
    } else {
      return value;
    }
  }
}