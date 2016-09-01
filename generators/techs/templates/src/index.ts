/// <reference path="../typings/index.d.ts"/>

import 'es6-shim';
<% if (modules !== 'systemjs') { -%>
import 'reflect-metadata';
<% } -%>
import 'zone.js/dist/zone';

import './index.<%- css %>';

<% if (router === 'uirouter') { -%>
import {enableProdMode, provide, NgModule} from '@angular/core';
import {UIRouterConfig, UIROUTER_PROVIDERS, UiView} from 'ui-router-ng2';
import {LocationStrategy, PathLocationStrategy, PlatformLocation} from '@angular/common';
import {BrowserPlatformLocation, BrowserModule} from '@angular/platform-browser';
import {MyUIRouterConfig} from './routes';
<% } else if (router === 'router') { -%>
import {RouterModule} from '@angular/router';
import {enableProdMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routes, RootComponent, components} from './routes';
<% } else { -%>
import {MainComponent} from './app/main';
import {enableProdMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
<% } -%>
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

<% if (modules === 'systemjs') { -%>
import {production} from '@system-env';

if (production) {
<% } else { -%>
declare var process: any;
if (process.env.NODE_ENV === 'production') {
<% } -%>
  enableProdMode();
}

@NgModule({
<% if (router === 'uirouter') { -%>
  declarations: [UiView],
  imports: [
    BrowserModule
  ],
  providers: [
    ...UIROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: PathLocationStrategy}),
    provide(PlatformLocation, {useClass: BrowserPlatformLocation}),
    provide(UIRouterConfig, {useClass: MyUIRouterConfig})
  ],
  bootstrap: [UiView]
<% } else if (router === 'router') { -%>
  declarations: [RootComponent, ...components],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [RootComponent]
<% } else { -%>
  declarations: [MainComponent],
  imports: [BrowserModule],
  bootstrap: [MainComponent]
<% } -%>
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
