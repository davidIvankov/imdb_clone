import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { environment } from "@env";
import { Observable } from "rxjs";

export class ApiCallInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({
            setParams: {api_key: environment.apiKey}
          });
        return next.handle(modifiedReq)
    }
}