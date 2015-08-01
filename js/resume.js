// var briefinfos = Util.getElementsByClassName('briefinfo');
// Util.removeClass(briefinfos[0], 'hidden');
// Util.addClass(briefinfos[0], 'a-sildeup a-duration1s');
// setTimeout(function(){
// 	Util.removeClass(briefinfos[1], 'hidden');
// 	Util.addClass(briefinfos[1], 'a-sildeup a-duration1s');
// }, 500);

var href = window.location.href;
window.location.href = href.match(/#page1$/)? href : href + '#page1';


Util.addEvent(document, 'mousewheel', slidePageHandler, false);

function slidePageHandler(event) {
	event = event || window.event;

	var pageMax = Util.getElementsByClassName('page').length;
	var href = window.location.href;
	var pageNow = parseInt(href.replace(/^.*#page/, ''));
	if(event.wheelDeltaY < 0 && pageNow < pageMax){
		window.location.href= href.replace(pageNow, ++pageNow);
	}

	if(event.wheelDeltaY > 0  && pageNow > 1){
		window.location.href= href.replace(pageNow, --pageNow);
	}
}

