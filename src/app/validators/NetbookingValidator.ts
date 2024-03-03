import { AbstractControl } from '@angular/forms';

export class NetbookingValidator {

  static matchPasswords() {
    return (control: AbstractControl) => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('passwordConfirm')?.value;

      if (password !== confirmPassword) {
        return { invalid_passwords: true };
      }
      return null;
    }
  }


}
