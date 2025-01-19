import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit{
  constructor(private router: Router) { }
  user = {
    email:'',
    username:'',
    password:'',
  };

  errormsj='';
  ngOnInit() {}

  
  register(){
    if(this.user.username.length > 0 && this.user.password.length > 0 && this.user.email.length > 0){
      this.router.navigate(['/home']);
      console.log(this.user);
    }else{
      this.errormsj = 'Las casillas no pueden estar vacias'
    }
  }
}
