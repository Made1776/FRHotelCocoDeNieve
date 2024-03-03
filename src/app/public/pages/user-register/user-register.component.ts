import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import {
  ModalTermsAndReferenceComponent
} from "../../../components/modal-terms-and-reference/modal-terms-and-reference.component";
import { UserRegisterDto } from "../../../models/dto/UserRegisterDto";
import { AuthService } from "../../../auth/services/auth.service";
import { NetbookingValidator } from "../../../validators/NetbookingValidator";
import { AlertHandler } from 'src/app/utils/AlertHandler';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbValidationModule,
  ],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup;
  modalRef: MdbModalRef<ModalTermsAndReferenceComponent> | null
  exp: number = 0;
  now: number = 0;
  idSolicitud: number = 0;

  constructor(
    private builder: FormBuilder,
    private route: Router,
    private modalService: MdbModalService,
    private authService: AuthService,
    private routeActivate: ActivatedRoute
  ) {
    this.registrationForm = new FormGroup({});
    this.modalRef = null;
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadParams();
    this.detectExp();
  }

  loadParams() {
    this.routeActivate.queryParams.subscribe(params => {
      this.idSolicitud = params['id_solicitud'];
      this.exp = params['exp'];
    });
  }

  detectExp(){
    this.now = new Date().getTime();
    const diference = this.exp - this.now;
    console.log(diference);
    if(diference <= 0 ){
      AlertHandler.show('El tiempo de solicitud ha expirado.', AlertType.ERROR);
      this.route.navigate(['/']).then();
    }
  }

  private buildForm() {
    this.registrationForm = this.builder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      enterprise: ['Netlife', [Validators.required]],
      cellphone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      mail: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      address: ['', [Validators.required]],

      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: NetbookingValidator.matchPasswords(),
    });

  }

  private registerUser() {

    const user: UserRegisterDto = {
      username: this.mailField?.value,
      password: this.passwordField?.value,
      personalData: {
        name: this.nameField?.value,
        lastname: this.lastnameField?.value,
        address: this.addressField?.value,
        cellphone: this.cellphoneField?.value,
        email: this.mailField?.value,
        company: this.enterpriseField?.value,
        role: this.roleField?.value,
      }
    }

    this.authService.performRegister(user).subscribe({
      next: () => {
        AlertHandler.show('Usuario registrado con éxito', AlertType.SUCCESS);
      },
      error: (error) => {
        console.log(error);
        AlertHandler.show('Hubo un error en el registro, inténtelo nuevamente', AlertType.ERROR);
      }
    });

  }

  get nameField() {
    return this.registrationForm.get('name');
  }

  get lastnameField() {
    return this.registrationForm.get('lastname');
  }

  get enterpriseField() {
    return this.registrationForm.get('enterprise');
  }

  get cellphoneField() {
    return this.registrationForm.get('cellphone');
  }

  get mailField() {
    return this.registrationForm.get('mail');
  }

  get roleField() {
    return this.registrationForm.get('role');
  }

  get addressField() {
    return this.registrationForm.get('address');
  }

  get passwordField() {
    return this.registrationForm.get('password');
  }

  onOpenModalTermsAndRef() {
    this.modalRef = this.modalService.open(ModalTermsAndReferenceComponent,
      {
        ignoreBackdropClick: true,
        containerClass: 'modal-dialog-centered modal-lg',
      });

    this.modalRef?.onClose.subscribe((isAccepted: boolean) => {
      if (isAccepted) {
        this.registerUser();
        this.route.navigate(['auth/login']).then();
      }
    });
  }

}
