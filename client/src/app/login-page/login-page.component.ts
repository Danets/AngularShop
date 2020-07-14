import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MaterialService } from '../shared/helpers/material.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  authSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkingAccess();
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  checkingAccess(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['registered']) {
        MaterialService.handleError("You are welcome!");
      } else if (params['refused']) {
        MaterialService.handleError("You gotta register!");
      }
      else if (params['sessionExpired']) {
        MaterialService.handleError("You gotta sign in again");
      }
    });
  }

  onSubmit() {
    this.authSub = this.authService.login(this.form.value).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['overview']);
      },
      (err) => {
        MaterialService.handleError(err.error.message);
      }
    );
    this.form.reset();
  }
}
