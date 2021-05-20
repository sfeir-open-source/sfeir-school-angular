import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** const MOCK_PERSON =   {
  "email": "hogandickerson@sfeir.com",
  "lastname": "Frizzarin",
  "firstname": "Nicolas",
  "gender": "male",
  "photo": "https://randomuser.me/portraits/men/86.jpg",
  "id": 9927,
  "twitter": "labore",
  "slack": "reprehenderit",
  "github": "aliquip",
  "linkedin": "qui",
  "url": "ex",
  "contactInfoPro": {
    "mail": "blackpowers@sfeir.com",
    "fixedPhone": "+33182449424",
    "mobilePhone": "+33684850125",
    "street": "220 Ide Court",
    "postalCode": "20636",
    "city": "Winchester"
  },
  "functionName": "Mcpherson",
  "functionDescription": "Wendi",
  "entity": "Sfeir-LUXEMBOURG",
  "currentClient": "Adeo",
  "workcity": "Luxembourg",
  "workAdress": "rue...",
  "manager": "Didier",
  "department": "Compta",
  "skills": ["Java", "AngularJS", "React", "git", "ES6", "JavaScript"],
  "entryDate": "21/10/2014",
  "birthDate": "11/12/2001",
  "socialNumber": "4785882151",
  "contactInfoPerso": {
    "mail": "wendipowers@sfeir.com",
    "fixedPhone": "+33197859629",
    "mobilePhone": "+33682956737",
    "street": "789 Nolans Lane",
    "postalCode": "36734",
    "city": "Loretto"
  },
  "emergencyContact": "",
  "emergencyPhoneNumber": "",
  "driverLicence": "",
  "tshirtSize": "XL",
  "numberOfChild": 4,
  "geo": {
    "lat": 48.849014738923636,
    "lng": 2.3431512050201304
  }
}; **/

@Injectable()
export class CachableInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
