import {AbstractControl} from "@angular/forms";
import {differenceInDays} from "date-fns";
import {formatDate} from "@angular/common";

export class ValidateDate {

  checkStartDate(abstractControl: AbstractControl): any {

    const startDateInput = abstractControl.value;
    // console.log(startDateInput);
    if (startDateInput != ''){
      const startDate = new Date(startDateInput);
      const now: Date = new Date();
      formatDate(now,'yyyy-MM-dd HH:mm:ss', 'en-US');

      const days = differenceInDays(startDate, now);

      return (days >= 0) ? null : {checkStartDate: true};
    }
  }

  checkStartDateAndEndDate(abstractControl: AbstractControl): any {
    const startDateInput = abstractControl.value.startDate;
    const endDateInput = abstractControl.value.endDate;
    if (startDateInput != '' && endDateInput != ''){
      const startDate = new Date(startDateInput);
      const endDate = new Date(endDateInput);
      const days = differenceInDays(endDate,startDate);
      if (days > 0) {
        console.log('oke')
      }else console.log('lỗi')
      return (days > 0) ? null : {checkStartDateAndEndDate: true};
    }

  }
  constructor() {
  }
}


