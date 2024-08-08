import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'user', component: UsersComponent},
  { path: 'post/:id', component: PostComponent},
  { path: '', redirectTo: '/user', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
