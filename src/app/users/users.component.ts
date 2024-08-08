import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '../Service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  router: Router = inject(Router);

  users: User[] = [];

  constructor(private userService: UserService){}
  
  ngOnInit(): void {

    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    })
  }

  viewPosts(userId: number): void{
    this.router.navigate(['/post',userId]);
  }

}
