import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  public LoginFormGroup: FormGroup;
  user: any;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    public service: ServicesService

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.LoginFormGroup.controls[controlName].hasError(errorName);
  };
  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }
  omit_special_char(event) {
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }
  //removing access token that has sets, goes with public router above
  Logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['']);
  }
  errorMessage: string;
  userMessage: string;
  showError: any;

  matcher = new ErrorStateMatcher();

}
