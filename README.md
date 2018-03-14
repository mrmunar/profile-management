# Profile Management

> Built on Angular 5+

## Requirements
> NodeJS and NPM ([download](https://nodejs.org/en/))

> Git

## Demo
[https://nameless-wave-43850.herokuapp.com/](https://nameless-wave-43850.herokuapp.com/)

## Clone the Git Repository

```
git clone https://github.com/mrmunar/profile-management profile-management
```

## Install npm dependencies

```
cd profile-management
npm install
```

## Run the Development Server
```
ng serve --open
```
*Will open a default browser automatically*

## Build for Production
```
ng build --prod --base-href=http://yourwebsite.com
```
Prodution files will be located at **/dist**

## Production Assets
[https://github.com/mrmunar/profile-management/tree/production/dist](https://github.com/mrmunar/profile-management/tree/production/dist)

## SASS Configured

##### ./*angular-cli.json*

```
"defaults": {
    "styleExt": "scss",
    "component": {
    }
}
```

## Module Bundler

Built-in Angular Webpack

##### *Styles bundle*

```HTML
<link href="styles.24773293fc104198fd15.bundle.css" rel="stylesheet"/>
```

##### *Javascript bundles*

```HTML
<script type="text/javascript" src="inline.0a23fd69c142623fdbca.bundle.js">
```

```HTML
<script type="text/javascript" src="polyfills.abdf53ca655716e505e0.bundle.js">
```

```HTML
<script type="text/javascript" src="main.dd037862a2fc4cf974b8.bundle.js">
```

## Usage

* Click the blue "Add User" button to populate the user list.
* Click on a user in the user list to display the user details.
* In the user details page, you can activate or delete a user.
* You can toggle between active and deleted users using the filter buttons located on the upper portion of the page.

## The Random User API
The API is consumed using the built-in Angular module - `HttpClientModule`. The endpoint URL is saved in the environments config file.

##### */src/environments/environment.ts*
```Typescript
export const environment = {
  production: false,
  apiUrl: 'https://randomuser.me/api/',
};
```
##### */src/app/services/profile-management.service.ts*

```Typescript
import { HttpClientModule } from '@angular/common/http';
```
```Typescript
imports: [
    BrowserModule,
    HttpClientModule,
    OrderModule
  ],
```

##### */src/app/services/profile-management.service.ts*
```Typescript
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
```

```Typescript
constructor(private http: HttpClient)
```

```Typescript
getRandomUserFromApi() {
    return this.http.get(environment.apiUrl);
}
```

## Managing State Through `localStorage`
State is persisted in the browser's `localStorage`

##### */src/app/services/profile-management.service.ts*

##### [ SET ]

```Typescript
setToLocalStorage(data: Object): void {
    localStorage.setItem('userList', JSON.stringify({ userList: data }));
}
```

##### [ GET ]

```Typescript
getUsersFromState(): Promise<Object> {
    return new Promise((resolve) => {
        resolve(JSON.parse(localStorage.getItem('userList')));
    });
}
```

## State Across Components
State is shared across all components with the use of `Observables`. The main state Observables reside in the services file, while the `Observers` (objects that watch out for state changes) reside in each individual component.

##### */src/app/services/profile-management.service.ts*

```Typescript
userList = new BehaviorSubject<Object>(null);
currentUser = new BehaviorSubject<Array<any>>(null);
currentFilter = new BehaviorSubject<string>(null);
```
##### */src/app/components/user-list/user-list.component.ts*

```Typescript
this.service.userList.subscribe(response => {
    this.data = response;
},
error => {
    throw new Error('Error: ' + error.message);
});
```

##### */src/app/components/user-details/user-details.component.ts*

```Typescript
this.service.currentFilter.subscribe(response => {
    let filter = response;
    this.currentFilter = filter ? filter : 'all';
},
error => {
    throw new Error('Error: ' + error.message);
});
```