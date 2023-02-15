import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  //Propiedades
  cambiarPassword: FormGroup;

  //Variables
  loading = false;


  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private toastr: ToastrService,
              private router: Router) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    }, { validators: this.checkPassword })
  }

  ngOnInit(): void {

  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls['nuevaPassword'].value;
    const confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true }
  }

  guardarPassword(): void {
    console.log(this.cambiarPassword)
    const changePassword: any = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.nuevaPassword
    };
    this.loading = true;
    this.usuarioService.changePassword(changePassword).subscribe({
      next: data => {
        this.toastr.info(data.message);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.loading = false;
        this.cambiarPassword.reset();
        this.toastr.error(err.error.message, 'Error!')
      }
    })
  }

}
