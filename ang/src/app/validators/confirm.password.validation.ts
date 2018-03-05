import { AbstractControl, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(pass: AbstractControl): ValidatorFn  {
  return (passwordConfirm: AbstractControl): { [key: string]: any } => {
    let isValid =  (pass.value == passwordConfirm.value) 
                // console.log("minlength - " + passwordConfirm.hasError("minlength") + " - " + passwordConfirm.value.length)
    return isValid ?  null :  {'confirmPassword': {value: passwordConfirm.value}}
  }
  
}
