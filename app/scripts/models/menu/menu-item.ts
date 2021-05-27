import { Model } from 'util/model';
import { MenuOption } from './menu-option';
import { Keys } from 'const/keys';
import { AlertConfig } from 'comp/ui/alerts';
import { LocaleKey } from 'util/locale';
import { InitWithFieldsOf, NonFunctionPropertyNames } from 'util/types';
import { Filter } from 'models/filter';
import { File } from 'models/file';

class MenuItem extends Model {
    id?: string;
    title?: string;
    locTitle?: LocaleKey;
    icon?: string;
    // customIcon?: null; // TODO(ts): custom icons
    active = false;
    expanded = true;
    items: MenuItem[] = [];
    shortcut?: Keys;
    options?: MenuOption[];
    cls?: string;
    iconCls?: string;
    disabledAlert?: AlertConfig;
    visible = true;
    drag = false;
    drop = false;
    filterKey?: NonFunctionPropertyNames<Filter>;
    filterValue?: string | true;
    collapsible = false;
    defaultItem = false;
    page?: string;
    editable = false;
    file?: File;
    section?: string;

    constructor(values?: InitWithFieldsOf<MenuItem>) {
        super();
        Object.assign(this, values);

        if (this.file) {
            this.file.onChange('name', (name) => {
                this.title = name;
            });
        }
    }

    addItem(item: MenuItem): void {
        this.items.push(item);
    }

    addOption(option: MenuOption): void {
        if (!this.options) {
            this.options = [];
        }
        this.options.push(new MenuOption(option));
    }

    toggleExpanded(): void {
        const items = this.items;
        let expanded = !this.expanded;
        if (!items || !items.length) {
            expanded = true;
        }
        this.expanded = expanded;
    }
}

export { MenuItem };
