var MyResume = MyResume || {};

(function() {
  var self = self || {};
  self.pageMax = 0;
  self.pagesDom = [];
  self.pagesDefaultInnerHTML = [];
  self.pageHash = [];

  function initMyResume() {
    console.log('%c Welcome, just contact me.', 'color:#00f;font-size:20px;');

    // init hash
    var hash = window.location.hash;
    hash = hash.match(/^#page\d+$/gi) ? hash : '#page1';
    window.location.hash = hash;

    self.pagesDom = Util.getElementsByClassName('page');
    self.pageMax = self.pagesDom.length;

    for (var i = 0; i < self.pageMax; i++) {
      self.pagesDefaultInnerHTML[i] = self.pagesDom[i].innerHTML;

      var pageName = self.pagesDom[i].className.replace(/page\spage_/, '');
      var pageId = self.pagesDom[i].id;
      self.pageHash[pageName] = self.pageHash[pageName] || pageId;
    };

    addPageNavigation();
    addGlobalEvents();

    // start view resume page
    viewResumePage();
  }

  function addPageNavigation() {
    if (self.pageHash.length === 0) {
      return;
    }

    var navItemsHTML = '';
    for (var key in self.pageHash) {
      navItemsHTML = navItemsHTML
      + '<li><a>'
      + self.pageHash[i]
      + '</a></li>';
    };
    var pageNavHTML = '<div><ul>'
    + navItemsHTML
    + '</ul></div>';

    var pageNavDiv = document.creatElement('div');
    document.appendChild(pageNavDiv);

    pageNavDiv.innerHTML = pageNavHTML;
    
  }

  function getPageNow() {
    return parseInt(window.location.hash.replace(/^#page/, ''));
  }

  function viewResumePage() {
    var pageNow = getPageNow();
    // set default innerHTML
    self.pagesDom[pageNow - 1].innerHTML = self.pagesDefaultInnerHTML[pageNow - 1];

    // init page with animation
    var initPageFunc = 'try{initPage_' + self.pagesDom[pageNow - 1].className.replace(/page\spage_/, '') + '();}catch(e){}';
    eval(initPageFunc);
  }

  function addGlobalEvents() {
    Util.addEvent(document.getElementById('arrowdown'), 'click', pageDown, false);
    Util.addEvent(document.getElementById('arrowup'), 'click', pageUp, false);

    Util.addEvent(document, 'mousewheel', slidePageHandler, false);
    Util.addEvent(document, 'keydown', keyPressHandler, false);
  }

  function slidePageHandler(event) {
    event = event || window.event;
    if (event.wheelDeltaY < 0 || event.wheelDelta < 0) {
      pageDown();
    }
    if (event.wheelDeltaY > 0 || event.wheelDelta > 0) {
      pageUp();
    }
  }

  function keyPressHandler(event) {
    event = event || window.event;
    var key = event.keyCode;
    if (key === 40) {
      pageDown();
    }
    if (key === 38) {
      pageUp();
    }
  }

  function pageDown() {
    gotoPage(getPageNow() + 1);
  }

  function pageUp() {
    gotoPage(getPageNow() - 1);
  }

  function gotoPage(pageIndex) {
    if (pageIndex < 1 || pageIndex > self.pageMax) {
      return;
    }

    // go
    var pageNow = getPageNow();
    window.location.hash = window.location.hash.replace(pageNow, pageIndex);

    viewResumePage();
  }

  function initPage_introduction() {
    var mySign = document.getElementById('mysign');
    var myEmail = document.getElementById('myemail');

    Util.removeClass(mySign, 'hidden');
    Util.addClass(mySign, 'visible a-sildeup a-duration1s');
    setTimeout(function() {
      Util.removeClass(myEmail, 'hidden');
      Util.addClass(myEmail, 'visible a-sildeup a-duration1s');
    }, 800);
  }

  MyResume = {
    initMyResume: initMyResume
  };
})();


MyResume.initMyResume();