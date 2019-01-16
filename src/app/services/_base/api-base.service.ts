import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {

  constructor() {
  }

  protected headers = {
    headers: this.setHeaders()
  };

  protected setHeaders(contentType: any = 'application/json'): HttpHeaders {
    const headersConfig = {
      'Accept': 'application/json'
    };

    if (contentType) {
      headersConfig['Content-Type'] = contentType;
    }

    return new HttpHeaders(headersConfig);
  }
}
