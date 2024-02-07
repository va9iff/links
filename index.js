window.addEventListener("load", function () {
	console.log('fafa')
	const head = document.getElementsByTagName('HEAD')[0];
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = './gruvwave/gruvwave.css';
	head.appendChild(link);

	document.head
	console.log('loaded')
})