// Cache-first network service worker, built at https://www.pwabuilder.com/

if (navigator.serviceWorker.controller) {
	console.log('Active service worker found, no need to register');
} else {
	navigator.serviceWorker.register('service-worker.js', {
		scope: './'
	}).then(function(reg) {
		console.log('Service worker registered for scope:'+ reg.scope);
	});
}
