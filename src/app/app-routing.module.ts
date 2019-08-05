import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'comics', loadChildren: './comics/comics.module#ComicsPageModule' },
  { path: 'characters', loadChildren: './characters/characters.module#CharactersPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'comic-description/:id', loadChildren: './comic-description/comic-description.module#ComicDescriptionPageModule' },
  { path: 'character-description/:id', loadChildren: './character-description/character-description.module#CharacterDescriptionPageModule' },
  { path: 'payment', loadChildren: './payment/payment.module#PaymentPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'password', loadChildren: './password/password.module#PasswordPageModule' },
  { path: 'acquisitions', loadChildren: './acquisitions/acquisitions.module#AcquisitionsPageModule' },
  { path: 'details/:id', loadChildren: './details/details.module#DetailsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
