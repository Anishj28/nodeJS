import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  regFun(form: NgForm){
    console.log(form.value);
  }

}
