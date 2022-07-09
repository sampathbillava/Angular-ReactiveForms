import { Component, OnInit } from '@angular/core';
//import { FormControl, FormGroup } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/user-name.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  registrationForm = this.fb.group({
    userName: ["Sam", [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],  //forbiddenNameValidator
    password: [""],
    confirmPassword: [""],
    email: [""],
    subscribe: [false],
    address: this.fb.group({
      city: [""],
      state: [""],
      postalCode: [""]
    }),
    alternateEmails: this.fb.array([])  //dynamic
  }, { validator: passwordValidator })

  ngOnInit(): void {

    // if subscribe is checked then email is required
    this.registrationForm.get('subscribe')?.valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email?.setValidators(Validators.required);
        }
        else {
          email?.clearValidators();
        }
        email?.updateValueAndValidity();
      })
  }
  title = 'reactive-form';

  get email() {
    return this.registrationForm.get('email');
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }
  //// using FormControl, FormGroup 
  // registrationForm = new FormGroup({
  //   userName: new FormControl("Sam"),
  //   password: new FormControl(""),
  //   confirmPassword: new FormControl(""),
  //   address: new FormGroup({
  //     city: new FormControl(""),
  //     state: new FormControl(""),
  //     postalCode: new FormControl("")
  //   })
  // });

  loadApiData() {

    //// using FormControl, FormGroup
    // this.registrationForm.setValue({
    //   userName: "Sam2",
    //   password: "test",
    //   confirmPassword: "test con",
    //   address: {
    //     city: "city",
    //     state: "state",
    //     postalCode: "123456"
    //   }
    // })

    // // load partial data
    // this.registrationForm.patchValue({
    //   userName: "Sam2",
    //   password: "test",
    //   address: {
    //     city: "city",
    //     postalCode: "123456"
    //   }
    // })

  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
