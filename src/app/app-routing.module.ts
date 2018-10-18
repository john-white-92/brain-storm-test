import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Компоненты
import {
	FirstViewComponent,
	SecondViewComponent
} from './components';

// Базовые маршруты
const routes: Routes = [

	// Маршрут
	{
		path: '',
		children: [
			{
				path: 'first',
				component: FirstViewComponent
			},
			{
				path: 'second',
				component: SecondViewComponent
			}
		]
	},

	// Некорректный маршрут
	{
		path: '**',
		redirectTo: '/'
	}
];

// Основной модуль машрутизации
@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
