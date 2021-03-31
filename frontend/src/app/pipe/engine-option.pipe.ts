import { Pipe, PipeTransform } from '@angular/core';
import { EngineType, engineTypeObject } from '@rg-share';

@Pipe({
  name: 'engineOption',
})
export class EngineOptionPipe implements PipeTransform {
  transform(value: keyof typeof engineTypeObject, args?: any): any[] {
    return engineTypeObject[value] ? engineTypeObject[value].options : [];
  }
}
@Pipe({
  name: 'engineType',
})
export class EngineTypePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return EngineType[value];
  }
}
