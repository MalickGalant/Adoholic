/** @license
 * Copyright 2015 - present The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This file contains an Express server that does two things:
//
// 1. During development, provide data APIs for the web app to consume
//
//     The development webpack-dev-server initiated via `npm start` can only serve
//     static files from the root project directory. This server provides two APIs
//     for dynamic data: listing AMP docs and retrieving contents of a single AMP doc.
//
//     For development, run `npm start`.
//     Then, in a **separate terminal shell**, run `node server.js`.
//
// 2. Testing the production build
//
//     `npm run build` builds the web app for production into the build/ folder.
//     This server also serves the content of that folder via express.static.
//
//     To test the prod build, run `npm run build && node server.js` and the navigate
//     to http://localhost:4000 on your web browser.

var express = require('express');
var path = require('path');
var pjson = require('./package.json');

// This port number must match that of `proxy` in `package.json`, which is used
// to redirect requests from the development server to the APIs in this file.
// See https://github.com/facebookincubator/create-react-app/blob/master/template/README.md#proxying-api-requests-in-development
var port = pjson.proxy ? parseInt(pjson.proxy.split(':')[2]) : 4000;

var app = express();

var docs = [
  {
    "title": "Top Spots for Hiking",
    "section": "Top Spots",
    "kicker": "Don't forget your walking stick",
    "author": "Demetria T. Edwards",
    "date": "Sep 24, 2016 10:04 AM",
    "image": "/content/hero/21.jpeg",
    "url": "/content/topspots.amp.html"
  },
  {
    "title": "Vancouver in 48 Hours",
    "section": "48 Hours",
    "kicker": "A Marvel in British Columbia",
    "author": "Todd M. Smallwood",
    "date": "Sep 22, 2016 5:04 AM",
    "image": "/content/hero/6.jpeg",
    "url": "/content/british.amp.html"
  },
  {
    "title": "Top Spots for Backpacking",
    "section": "Top Spots",
    "kicker": "Pack your backpack",
    "author": "Demetria T. Edwards",
    "date": "Sep 20, 2016 7:06 AM",
    "image": "/content/hero/29.jpeg",
    "url": "/content/bagpack.amp.html"
  },
