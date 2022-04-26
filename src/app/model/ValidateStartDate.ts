import {AbstractControl} from "@angular/forms";
import {differenceInDays} from "date-fns";

export class ValidateDate {

  checkStartDate(abstractControl: AbstractControl): any {

    const startDateInput = abstractControl.value;
    // console.log(startDateInput);

    const startDate = new Date(startDateInput);
    const now = new Date();
    console.log(startDate);
    console.log(now);

    const days = differenceInDays(startDate, now);
    console.log(days);

    return (days >= 0) ? null : {checkStartDateOk: true};

  }

  checkStartDateAndEndDate(abstractControl: AbstractControl): any {
    const startDateInput = abstractControl.value;
    const endDateInput = abstractControl.value;
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    const days = differenceInDays(endDate,startDate);

    return (days >= 0) ? null : {checkStartDateOk: true};
  }
  constructor() {
  }
}


