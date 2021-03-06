import { SignupComponent } from './../signup/signup.component';
import { ToolbarComponent } from './../toolbar/toolbar.component';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormErrorStateMatcher } from '../../models/form-error-state-matcher';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    private passTooltip = 'pass is required';
    private loginTooltip = 'login is required';
    private matcher = new FormErrorStateMatcher();

    private login = new FormControl('', [
        Validators.required,
        Validators.minLength(3)
    ]);
    private password = new FormControl('', [
        Validators.required,
        Validators.minLength(3)
    ]);
    private loginForm: FormGroup = this.builder.group({
        login: this.login,
        password: this.password
    });

    constructor(
        private builder: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private dialogRef: MatDialogRef<LoginComponent>,
        private snackBar: MatSnackBar,
        private modal: MatDialog
    ) { }

    ngOnInit() { }

    private logIn() {
        this.auth.login(this.login.value, this.password.value).subscribe(result => {
            console.log(result);
            if (result['status'] === 0) {
                this.snackBar.open('Login or password is not valid.', 'close', {
                    duration: 3000,
                });
            } else if (result['status'] === 1) {
                localStorage.setItem('userStatus', 'authorized');
                localStorage.setItem('token', result['token']);
                localStorage.setItem('id', result['id']);
                localStorage.setItem('login', result['login']);
                this.dialogRef.close();
                this.router.navigate(['/']);
                this.snackBar.open('You are authorized.', 'close', {
                    duration: 3000,
                });

            }
        });
    }

    private signup() {
        this.dialogRef.close();
        this.modal.open(SignupComponent, {
            width: '500px',
            data: {}
        });
    }

}
