import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { MdbValidationModule } from "mdb-angular-ui-kit/validation";
import { RegisterRequestService } from 'src/app/private/admin/services/register-request.service';
import { RegisterRequest } from 'src/app/models/RegisterRequest';
import { AlertHandler } from 'src/app/utils/AlertHandler';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-app',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MdbFormsModule,
    MdbValidationModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration-app.component.html',
  styleUrls: ['./registration-app.component.scss']
})
export class RegistrationAppComponent {
  requestForm: FormGroup;

  constructor(private builder: FormBuilder,
    private registerRequestService: RegisterRequestService,private router: Router) {
    this.requestForm = new FormGroup({});
    this.buildForm();
  }

  private buildForm() {
    this.requestForm = this.builder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
            // mail: ['', [Validators.required, Validators.email]],
    });
  }

  buildRequest(): RegisterRequest {
    const request: RegisterRequest = {
      idRegisterRequest: 0,
      personalData: {
        idPersonalData: 0,
        name: this.requestForm.get('name')?.value,
        lastname: this.requestForm.get('lastname')?.value,
        address: '',
        cellphone: '',
        email: this.requestForm.get('mail')?.value,
        company: '',
        role: ''
      },
      requestDate: new Date(),
      status: 'Pendiente'
    };

    return request;
  }

  onSendRequest() {
    console.log(this.buildRequest());
    this.registerRequestService.save(this.buildRequest()).subscribe(
      (response) => {
        AlertHandler.show('Solicitud enviada con exito', AlertType.SUCCESS);
        console.log(response);
        this.router.navigate(['/']);
      },
      (error) => {
        AlertHandler.show('Hubo un error en la solicitud, inténtelo nuevamente', AlertType.ERROR);
        console.log(error);
      }
    )
  }
}
