import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./registration/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./registration/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  
  {
    path: 'sign-up',
    loadChildren: () => import('./registration/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'records',
    loadChildren: () => import('./records/records.module').then( m => m.RecordsPageModule)
  },
  {
    path: 'analysis',
    loadChildren: () => import('./analysis/analysis.module').then( m => m.AnalysisPageModule)
  },
  {
    path: 'budgets',
    loadChildren: () => import('./budgets/budgets.module').then( m => m.BudgetsPageModule)
  },
  {
    path: 'remainder',
    loadChildren: () => import('./remainder/remainder.module').then( m => m.RemainderPageModule)
  },
  {
    path: 'goals',
    loadChildren: () => import('./goals/goals.module').then( m => m.GoalsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
