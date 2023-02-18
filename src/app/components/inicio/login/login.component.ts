import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from '../../../models/usuario'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  login: FormGroup;


  constructor(private fb: FormBuilder,
              private toastr: ToastrService, 
              private router: Router,
              private loginService: LoginService) {
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  log(): void {
    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    };
    this.loading = true;
    this.loginService.login(usuario).subscribe({
      next: data => {
        this.loginService.setLocalStorage(data.token);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.loading = false;
        this.toastr.error(err.error.message, 'Error!');
        this.login.reset();
      }
    });
    // setTimeout(() => {
    //   if (usuario.nombreUsuario === 'user' && usuario.password === 'admin') {
    //     this.login.reset();
    //     this.router.navigate(['/dashboard'])
    //   }
    //   else {
    //     this.toastr.error('Usuario o contraseña incorrecto', 'Error')
    //     this.login.reset();
    //   }
    //   this.loading = false;
    // }, 3000);

    // console.log(usuario)
  }

}
