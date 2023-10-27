import { NgModule } from "@angular/core";
import { TitlesComponent } from "./titles.component";
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "@shared/layout/error/error.component";
import { LayoutModule } from "@shared/layout/layout.module";
import { CoreModule } from "app/core.module";

const routes: Routes = [
    {path: '', component: ErrorComponent, pathMatch: 'full'},
    {path: ':id', component: TitlesComponent},
]

@NgModule({
    declarations: [TitlesComponent],
    imports: [SharedModule, RouterModule.forChild(routes), CoreModule, LayoutModule],
    exports: [TitlesComponent, RouterModule]
})

export class TitlesModule {}