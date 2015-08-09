var MyResume = MyResume || {};

(function() {
  var self = self || {};
  self.pageMax = 0;
  self.pagesDom = [];
  self.pagesDefaultInnerHTML = [];
  self.pagesHash = {};

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
      var pageHash = self.pagesDom[i].id;
      self.pagesHash[pageName] = self.pagesHash[pageName] || pageHash;
    };

    addPageNavigation(self.pagesHash, viewResumePage);
    addGlobalEvents();

    // start view resume page
    viewResumePage();
  }

  function addPageNavigation(pageHash, clickCallback) {
    if (pageHash.length === 0) {
      return;
    }

    var navItemsHTML = '';
    for (var key in pageHash) {
      navItemsHTML = navItemsHTML
      + '<li style="list-style-type:square;font-size:20px;color:white;cursor:pointer;">'
      + '<span style="display:none;font-size:14px;color:#fff;margin:0px -10px;vertical-align:top;">'
      + key.replace(/\b\w/g, function(str){return str.toUpperCase();})
      + '</span>'
      + '</li>';
    };
    var pageNavHTML = '<div id="pagenavigation" style="position: fixed;z-index: 1;top: 40%;left:30px;">'
    + '<ul">'
    + navItemsHTML
    + '</ul>'
    + '</div>';

    var pageNavDiv = document.createElement('div');
    document.body.appendChild(pageNavDiv);
    pageNavDiv.outerHTML = pageNavHTML;

    var li_MouseOver = function (){
        this.style.color = 'black';
      this.getElementsByTagName('span')[0].style.display = 'inline'
    }

    var li_MouseOut = function (){
      if (this.style.color === 'black') {
        this.style.color = 'white';
      }
      this.getElementsByTagName('span')[0].style.display = 'none'
    }

    var li_Click = function (){
      window.location.hash = pageHash[this.getElementsByTagName('span')[0].innerHTML.toLowerCase()];
      clickCallback();
    }

    var lis = document.getElementById('pagenavigation').getElementsByTagName('li');
    Util.addEvent(lis, 'mouseover', li_MouseOver, false);
    Util.addEvent(lis, 'mouseout', li_MouseOut, false);
    Util.addEvent(lis, 'click', li_Click, false);
  }

  function getPageNow() {
    return parseInt(window.location.hash.replace(/^#page/, ''));
  }

  function viewResumePage() {
    var pageNow = getPageNow();
    // set default innerHTML
    self.pagesDom[pageNow - 1].innerHTML = self.pagesDefaultInnerHTML[pageNow - 1];

    // 页面过场动画
    Util.addClass(self.pagesDom[pageNow - 1].getElementsByClassName('pagecontent'), 'a-zoomin a-duration_5s');

    // init page with animation
    var initPageFunc = 'try{initPage_' + self.pagesDom[pageNow - 1].className.replace(/page\spage_/, '').replace(/\b\w/, function(str) {
      return str.toUpperCase();
    }) + '();}catch(e){}';
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
    if (pageIndex < 1) {
      pageIndex = self.pageMax;
    }
    if (pageIndex > self.pageMax) {
      pageIndex = 1;
    }

    // go
    var pageNow = getPageNow();
    window.location.hash = window.location.hash.replace(pageNow, pageIndex);

    viewResumePage();
  }

  function initPage_Introduction() {
    var mySign = document.getElementById('mysign');
    var myEmail = document.getElementById('myemail');

    Util.addClass(mySign, 'hidden');
    Util.addClass(myEmail, 'hidden');

    Util.removeClass(mySign, 'hidden');
    Util.addClass(mySign, 'a-sildeup a-duration1s');
    setTimeout(function() {
      Util.removeClass(myEmail, 'hidden');
      Util.addClass(myEmail, 'a-sildeup a-duration1s');
    }, 800);
  }

  function initPage_Skill(){
    var skillTree = document.getElementById('skilltree');
    var expertSkills = skillTree.getElementsByClassName('expert');
    var familiarSkills = skillTree.getElementsByClassName('familiar');
    var justknowSkills = skillTree.getElementsByClassName('justknow');

    Util.addClass(expertSkills, 'hidden');
    Util.addClass(familiarSkills, 'hidden');
    Util.addClass(justknowSkills, 'hidden');

    Util.removeClass(expertSkills, 'hidden');
    Util.addClass(expertSkills, 'a-zoomin a-duration1s');
    setTimeout(function() {
      Util.removeClass(familiarSkills, 'hidden');
      Util.addClass(familiarSkills, 'a-zoomin a-duration1s');
    }, 600);
    setTimeout(function() {
      Util.removeClass(justknowSkills, 'hidden');
      Util.addClass(justknowSkills, 'a-zoomin a-duration1s');
    }, 1200);
  }

  function initPage_Internship() {
    var myInternship = document.getElementById('myinternship');
    var myProject = myInternship.getElementsByClassName('myproject');

    Util.addClass(myProject, 'hidden');

    Util.removeClass(myProject[0], 'hidden');
    Util.addClass(myProject[0], 'a-sildeup a-duration1s');

    for (var i = 1; i < myProject.length; i++) {
      (function(i) {
        setTimeout(function() {
          Util.removeClass(myProject[i], 'hidden');
          Util.addClass(myProject[i], 'a-sildeup a-duration1s');
        }, 800 * i);
      })(i);
    }
  }

  MyResume = {
    initMyResume: initMyResume
  };
})();


MyResume.initMyResume();