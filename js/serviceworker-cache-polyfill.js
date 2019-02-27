/**
 * Minified by jsDelivr using UglifyJS v3.4.0.
 * Original file: /npm/serviceworker-cache-polyfill@4.0.0/index.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(){var t=Cache.prototype.addAll,e=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(e)var r=e[1],n=parseInt(e[2]);t&&(!e||"Firefox"===r&&46<=n||"Chrome"===r&&50<=n)||(Cache.prototype.addAll=function(r){var n=this;function o(t){this.name="NetworkError",this.code=19,this.message=t}return o.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return r=r.map(function(t){return t instanceof Request?t:String(t)}),Promise.all(r.map(function(t){"string"==typeof t&&(t=new Request(t));var e=new URL(t.url).protocol;if("http:"!==e&&"https:"!==e)throw new o("Invalid scheme");return fetch(t.clone())}))}).then(function(t){if(t.some(function(t){return!t.ok}))throw new o("Incorrect response status");return Promise.all(t.map(function(t,e){return n.put(r[e],t)}))}).then(function(){})},Cache.prototype.add=function(t){return this.addAll([t])})}();
//# sourceMappingURL=/sm/087af7efb936a343c76af3f4b5abaca4df79151c7f5572a463aba83b4c8fb9ad.map