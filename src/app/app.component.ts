import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// Интерфейс вкладки
interface ITab {

	// Наименование
	title: string;

	// Путь
	path: string;
}

// Базовый компонент
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute
	) {
		this.subscribeRouter();
	}

	// Ключ для хранилища
	private readonly TAB_KEY = 'current-tab';

	// Вкладки
	public readonly tabs = [
		{
			title: 'First',
			path: 'first'
		},
		{
			title: 'Second',
			path: 'second'
		}
	];

	// Текущая вкладка
	public currentTab: any;

	// Обработчик выбора вкладки
	public onSelectTab(tab: ITab): void {
		if (tab) {
			this.navigate(tab.path);
		}
	}

	// Переход роута
	private navigate(path: string): void {
		this.router.navigate([ path ], { relativeTo: this.route });
	}

	// Подписаться на смену роута
	private subscribeRouter(): void {
		this.router.events
			.pipe(
				filter((event: any): boolean => event instanceof NavigationEnd)
			)
			.subscribe((): void => {
				this.updateTabs();
			});
	}

	// Обновить текущую вкладку
	private updateTabs(): void {
		const find = this.tabs.find((tab: ITab): boolean => {
			const urlTree = this.router.createUrlTree(
				[ tab.path ],
				{ relativeTo: this.route }
			);

			return this.router.isActive(urlTree, false);
		});

		if (find) {

			// Вкладка по роуту найдена (установим и сохраним)
			this.currentTab = find;
			this.saveToStorage();
		} else {

			// Вкладка не найдена
			const path = this.pathFromStorage();
			if (path) {

				// Но найден сохраненный маршрут
				this.navigate(path);
			} else {

				// Нет сохраненного маршрута - берем из первой вкладки
				this.navigate(
					this.tabs &&
					this.tabs[0] &&
					this.tabs[0].path
				);
			}
		}
	}

	// Сохранить путь текущей вкладки в хранилище
	private saveToStorage(): void {
		localStorage.setItem(
			this.TAB_KEY,
			this.currentTab && this.currentTab.path
		);
	}

	// Путь из хранилища
	private pathFromStorage(): string {
		return localStorage.getItem(this.TAB_KEY);
	}
}
