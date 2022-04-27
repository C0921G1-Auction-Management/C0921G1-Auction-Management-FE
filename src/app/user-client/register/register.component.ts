import {Component, Inject, OnInit} from '@angular/core';
import {MemberKhanhLDQ} from "../../model/member-khanh-ldq";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MemberRegistrationService} from "../../service/member-registration.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AngularFireStorage} from "@angular/fire/storage";
import {differenceInYears} from 'date-fns';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  member: MemberKhanhLDQ;
  memberForm: FormGroup;
  selectedImage: any = "";
  imageThis = "assets/img/avatar-register.png";
  // observableSpin= new Observable(this.myObservable);

  errors: any;

  constructor(
    private memberRegistrationService: MemberRegistrationService,
    private dialog: MatDialog,
    private router: Router,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.memberForm = new FormGroup({
      name: new FormControl('',
        Validators.compose([Validators.required, Validators.pattern("^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$")])),
      dayOfBirth: new FormControl('',
        Validators.compose([Validators.required, this.checkAgeMember])),
      address: new FormControl('',
        Validators.compose([Validators.required])),
      phoneNumber: new FormControl('',
        Validators.compose([Validators.required, Validators.pattern('^(\\(84\\)\\+|0)(90|91)(\\d){7}$')])),
      gender: new FormControl('',
        Validators.compose([Validators.required])),
      email: new FormControl('',
        Validators.compose([Validators.required, Validators.email])),
      identityNumber: new FormControl('',
        Validators.compose([Validators.required, Validators.pattern('^((\\d){9}|(\\d){12})$')])),

      passwordFormGroup: new FormGroup({
        password: new FormControl('',
          Validators.compose([Validators.required])),
        confirmPassword: new FormControl('',
          Validators.compose([Validators.required]))
      }, this.comparePassword),

      check: new FormControl('',
        Validators.compose([Validators.required]))
    })
  }

  //check duplicated password - KhanhLDQ
  comparePassword(compare: AbstractControl): any {
    const validate = compare.value;
    // console.log(validate.password + "ok");
    return (validate.password === validate.confirmPassword) ? null : {notMatch: true};
  }

  //age member >= 16 or <= 100 - KhanhLDQ
  checkAgeMember(abstractControl: AbstractControl): any {
    const formValue = abstractControl.value;
    const now = new Date();
    const dateOfBirth = new Date(formValue);

    const years = differenceInYears(now, dateOfBirth);
    // console.log(years);

    return (years >= 16 && years <= 100) ? null : {notSuitableAge: true};
  }

  onSubmit() {

  }

  clearData() {

  }

}
