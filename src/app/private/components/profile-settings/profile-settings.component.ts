import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User } from 'src/app/models/User';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MatMenuModule } from '@angular/material/menu';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalData } from 'src/app/models/PersonalData';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { AlertHandler } from 'src/app/utils/AlertHandler';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    CommonModule,
    MdbFormsModule,
    MatMenuModule,
    ReactiveFormsModule,
    MdbValidationModule,
  ],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  user: User | null = null;
  username: string = '';
  userEmail: string = '';
  currentRol: string = '';
  isEditProfile: boolean = false;
  isPhotoUploaded: boolean = true;
  profileForm: FormGroup;
  isPasswordChange: boolean = false;
  passwordForm: FormGroup;
  passwordVisibility: { [key: string]: boolean } = {};

  constructor(
    private usersService: UsersService,
    private location: Location,
    private builder: FormBuilder
  ) {
    this.profileForm = new FormGroup({});
    this.passwordForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.usersService.user$.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
    const currentPath = this.location.path().split('/');

    if (currentPath[1] === 'user') {
      this.currentRol = 'Usuario';
    }
    if (currentPath[1] === 'admin') {
      this.currentRol = 'Administrador';
    }

    this.buildForm();
    this.profileForm.get('mail')?.disable();
    this.buildPasswordForm();
  }

  private buildForm() {
    this.profileForm = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      company: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mail: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._-]+@netlife\.net\.ec$/),
        ],
      ],
      cellphone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  setForm() {
    this.profileForm.patchValue({
      firstName: this.user?.personalData.name,
      lastName: this.user?.personalData.lastname,
      company: this.user?.personalData.company,
      address: this.user?.personalData.address,
      mail: this.user?.personalData.email,
      cellphone: this.user?.personalData.cellphone,
    });
  }

  private buildPasswordForm() {
    this.passwordForm = this.builder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          this.customPasswordValidator,
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.mismatchValidator('newPassword')],
      ],
    });
  }

  customPasswordValidator(control: any) {
    const hasNumber = /\d/.test(control.value);
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);

    const isValid = hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar;

    return isValid ? null : { invalidPassword: true };
  }

  getProgress(): number {
    const criteria = 5;
    let fulfilledCriteria = 0;

    if (/\d/.test(this.passwordForm.get('newPassword')?.value)) {
      fulfilledCriteria++;
    }
    if (/[A-Z]/.test(this.passwordForm.get('newPassword')?.value)) {
      fulfilledCriteria++;
    }
    if (/[a-z]/.test(this.passwordForm.get('newPassword')?.value)) {
      fulfilledCriteria++;
    }
    if (
      /[!@#$%^&*(),.?":{}|<>]/.test(this.passwordForm.get('newPassword')?.value)
    ) {
      fulfilledCriteria++;
    }
    if (this.passwordForm.get('newPassword')?.value.length >= 10) {
      fulfilledCriteria++;
    }

    return (fulfilledCriteria / criteria) * 100;
  }

  passwordHasUpperCase(): boolean {
    return /[A-Z]/.test(this.passwordForm.get('newPassword')?.value);
  }

  passwordHasLowerCase(): boolean {
    return /[a-z]/.test(this.passwordForm.get('newPassword')?.value);
  }

  passwordHasNumber(): boolean {
    return /\d/.test(this.passwordForm.get('newPassword')?.value);
  }

  passwordHasSpecialChar(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(
      this.passwordForm.get('newPassword')?.value
    );
  }

  togglePasswordVisibility(typePassword: string) {
    this.passwordVisibility[`show${typePassword}Password`] =
      !this.passwordVisibility[`show${typePassword}Password`];
  }

  mismatchValidator(controlToCompare: string) {
    return (control: any) => {
      const controlToCompareValue = controlToCompare
        ? control.root.value[controlToCompare]
        : null;
      if (controlToCompareValue !== control.value) {
        return {
          mismatch: true,
        };
      }
      return null;
    };
  }

  onEdit() {
    this.setForm();
    this.isEditProfile = true;
  }

  onChangePassword() {
    this.isPasswordChange = true;
  }

  buildPersonalData(): PersonalData {
    const PersonalData: PersonalData = {
      idPersonalData: this.user?.personalData.idPersonalData,
      name: this.profileForm.get('firstName')?.value,
      lastname: this.profileForm.get('lastName')?.value,
      company: this.profileForm.get('company')?.value,
      address: this.profileForm.get('address')?.value,
      email: this.profileForm.get('mail')?.value,
      cellphone: this.profileForm.get('cellphone')?.value,
    };
    return PersonalData;
  }

  buildUser(): User {
    const User: User = {
      idUser: this.user?.idUser!,
      personalData: this.buildPersonalData(),
      username: this.user?.username!,
      dateEntry: this.user?.dateEntry!,
      dateLastLogin: this.user?.dateLastLogin!,
      active: this.user?.active!,
      notLocked: this.user?.notLocked!,
    };
    return User;
  }

  onSave() {
    // this.isEditProfile = false;
    console.log(this.buildUser());
    this.usersService
      .update(this.buildUser().idUser, this.buildUser())
      .subscribe(
        (response) => {
          AlertHandler.show(
            'Perfil actualizado exitosamente',
            AlertType.SUCCESS
          );

          setTimeout(() => {
            this.usersService.saveInLocalStorage(response);
            this.usersService.setUser(response);
            this.isEditProfile = false;
            this.ngOnInit();
          }, 2000);
        },
        (error) => {
          AlertHandler.show(
            'Error en la actualización, inténtelo nuevamente',
            AlertType.ERROR
          );
          console.log(error);
        }
      );
  }

  onSavePassword() {
    this.isPasswordChange = false;
    //TODO: hacer el cambio de contraseña desde la plataforma con el servicio
  }

  onCancel() {
    this.isEditProfile = false;
    this.isPasswordChange = false;
  }

  onUploadPhoto() {}

  onDeletePhoto() {}
}
