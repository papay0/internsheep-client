import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'myfilterOffers',
    pure: false
})
export class MyFilterOffersPipe implements PipeTransform {
    transform(items: any[], search: string, typeOfSearch ): any {
        if(items == null){
            return [];
        }
        if (typeOfSearch === 0) {
            return items
        .filter(item => item.company.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        } else if (typeOfSearch === 1) {
            return items
        .filter(item => item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        } else if (typeOfSearch === 2) {
            return items
        .filter(item => item.description.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        }
         else {
            return items
        .filter(item => item.company.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        }
    }
}