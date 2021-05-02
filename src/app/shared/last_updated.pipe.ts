import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'last_updated',
    pure: true
})

export class LastUpdatedPipe implements PipeTransform {
    transform(value: number): any {
        let cur_time = Date.now();
        if(value + (60*1000) >= cur_time){
            return "A few seconds ago"
        }else if(value+(120*1000) > cur_time){
            return "A minute ago"
        }else{
            let dt = new Date(value)
            let h = (dt.getHours() % 12) || 12
            return (h < 10 ? '0' : '')+h+":"+(dt.getMinutes() < 10 ? '0' : '')+dt.getMinutes()+" "+(dt.getHours() < 12 ? ' AM' : ' PM' );
        }
    }
}