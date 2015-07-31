var page1 = document.getElementById('page1');

document.addEventListener('scroll', handler, false);
//document.attachEvent('onscroll', handler);
document['onscroll'] = handler;

function handler () {
	console.log("eeeee");
	
}