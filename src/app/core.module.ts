import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ApiCallInterceptor } from "@shared/api-call-interceptor.service";

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ApiCallInterceptor, multi: true },
      ],
})

export class CoreModule {}