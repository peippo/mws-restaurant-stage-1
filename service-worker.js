// "Offline copy of pages" service worker, built at https://www.pwabuilder.com/

self.addEventListener('install', function(event) {
	var indexPage = new Request('index.html');
	event.waitUntil(
		fetch(indexPage).then(function(response) {
			return caches.open('sw-offline').then(function(cache) {
				console.log('Cached index page during install '+ response.url);
				return cache.put(indexPage, response);
			});
	}));
});

//If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', function(event) {
	var updateCache = function(request){
		return caches.open('sw-offline').then(function (cache) {
			return fetch(request).then(function (response) {
				console.log('Add page to offline '+response.url);
				return cache.put(request, response);
			});
		});
	};

	event.waitUntil(updateCache(event.request));

	event.respondWith(
		fetch(event.request).catch(function(error) {
			console.log( 'Network request Failed. Serving content from cache: ' + error );

			//Check to see if you have it in the cache
			//Return response
			//If not in the cache, then return error page
			return caches.open('sw-offline').then(function (cache) {
				return cache.match(event.request).then(function (matching) {
					var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
					return report;
				});
			});
		})
	);
});
