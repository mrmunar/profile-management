import { Pipe, PipeTransform } from "@angular/core";

/**
 * Capitalize Pipe class for transforming set of words to title case
 */
@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  /**
   * 
   * 
   * @param {string} value String to apply title case 
   * @param {any} args Just a provision for possible additional arguments
   * @returns {any} Capitalized words
   */
  transform(value: string, args?: any): any {
    return value.split(' ').map(word => {
      return word.length > 2 ? word[0].toUpperCase() + word.substr(1) : word;
    }).join(' ');
  }
}