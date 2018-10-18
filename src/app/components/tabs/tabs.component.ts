import {
	Component,
	EventEmitter,
	Input,
	Output
} from '@angular/core';

// Интерфейс вкладки
interface ITab {

	// Наименование
	title: string;
}

// Вкладки
@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

	// Вкладки
	@Input() public tabs: ITab[];

	// Текущая вкладка
	@Input() public current: ITab;

	// Выбор
	@Output() public select = new EventEmitter<ITab>();

	// Обработчик выбора
	public onClick(tab: ITab): void {
		this.select.emit(tab);
	}
}
