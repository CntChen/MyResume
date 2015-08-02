var MyResume = MyResume || {};

(function (){
  var self = self || {};
  self.pageNow = 1;

  function initMyResume(){

  }

  function getPageNow(){

  }

  function startViewMyResume() {
    var href = window.location.href;
    window.location.href = href.match(/#page\d+$/) ? href : href + '#page1';
    var pageNow = parseInt(href.replace(/^.*#page/, ''));
    eval('try{startViewPage' + pageNow +'();}catch(e){}');
  }

  function startViewPage1() {
    var briefinfos = Util.getElementsByClassName('briefinfo');
    Util.removeClass(briefinfos[0], 'hidden');
    Util.addClass(briefinfos[0], 'a-sildeup a-duration1s');
    setTimeout(function() {
      Util.removeClass(briefinfos[1], 'hidden');
      Util.addClass(briefinfos[1], 'a-sildeup a-duration1s');
    }, 500);
  }

function addAllEvents(){
  var arrowDown = document.getElementById('arrowdown');
  Util.addEvent(arrowDown, 'click', pageDown, false);
  Util.addEvent(document, 'mousewheel', slidePageHandler, false);
}


function slidePageHandler(event) {
  event = event || window.event;
  if (event.wheelDeltaY < 0) {
    pageDown();
  }
  if (event.wheelDeltaY > 0) {
    pageUp();
  }
}

function pageDown() {
  var pageMax = Util.getElementsByClassName('page').length;
  var href = window.location.href;
  var pageNow = parseInt(href.replace(/^.*#page/, ''));
  if (pageNow < pageMax) {
    window.location.href = href.replace(pageNow, ++pageNow);
  }
}

function pageUp() {
  var pageMax = Util.getElementsByClassName('page').length;
  var href = window.location.href;
  var pageNow = parseInt(href.replace(/^.*#page/, ''));
  if (pageNow > 1) {
    window.location.href = href.replace(pageNow, --pageNow);
  }
}

  MyResume = {
  startViewMyResume:startViewMyResume
  };
})(); 



MyResume.startViewMyResume();



