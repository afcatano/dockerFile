import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'replace'})
export class ReplacePipe implements PipeTransform {

    transform(value: string): any {
        value = value.replace(/\[/g, '<')
        return value.replace(/\]/g, '>');
    }
}