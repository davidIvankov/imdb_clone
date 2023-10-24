import { NgModule } from "@angular/core";
import { MenuComponent } from "./header/menu/menu.component";
import { HeaderComponent } from "./header/header.component";
import { SearchDropdownComponent } from "./header/search-dropdown/search-dropdown.component";
import { ErrorComponent } from "./error/error.component";
import { SharedModule } from "@shared/shared.module";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { ChartsItemComponent } from "./charts-item/charts-item.component";
import { CoreModule } from "app/core.module";

@NgModule({
    declarations: [
        MenuComponent, 
        HeaderComponent, 
        SearchDropdownComponent, 
        ErrorComponent, 
        LoadingSpinnerComponent,
        ChartsItemComponent
    ],
    imports: [ SharedModule, CoreModule],
    exports: [
        MenuComponent, 
        HeaderComponent, 
        SearchDropdownComponent, 
        ErrorComponent, 
        LoadingSpinnerComponent, 
        ChartsItemComponent
    ]
})

export class LayoutModule {}