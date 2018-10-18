import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Модули
import { AppRoutingModule } from './app-routing.module';

// Компоненты
import { AppComponent } from './app.component';
import {
	TabsComponent,
	FirstViewComponent,
	SecondViewComponent
} from './components';

// Базовый модуль
@NgModule({
	declarations: [
		AppComponent,
		TabsComponent,
		FirstViewComponent,
		SecondViewComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
