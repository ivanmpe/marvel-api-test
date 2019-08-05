import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'comics',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../comics/comics.module').then(m => m.ComicsPageModule)
          }
        ]
      },
      {
        path: 'characters',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../characters/characters.module').then(m => m.CharactersPageModule)
          }
        ]
      },
     /* {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../cart/cart.module').then(m => m.CartPageModule)
          }
        ]
      },*/
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'tabs',
        redirectTo: '/tabs',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/comics',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
