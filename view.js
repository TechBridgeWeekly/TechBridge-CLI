var blessed = require('blessed');
var Screen = require('./component/Screen');
var LoadingBox = require('./component/LoadingBox');
var List = require('./component/List');
var TitleBar = require('./component/TitleBar');

var screen, list, loadingBox, titleBar;

exports.init = function(options){
  options.title = options.title || 'TechBridge';
  screen = Screen(blessed);
  screen.title = options.title;
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
}

exports.loading = function(){
  loadingBox = LoadingBox(blessed);
  screen.append(loadingBox);
  screen.render();
}

exports.render = function(options){
  var now = 1;
  var length = options.items.length;
  var items = options.items.map(function(item){
    return options.getTitle(item);
  });

  titleBar = TitleBar(blessed);
  list = List(blessed, items);

  if(loadingBox){
    loadingBox.destroy();
  }

  screen.append(titleBar);
  screen.append(list);
  showLineNumber(now, length);

  list.focus();
  screen.render();

  list.on('select', function(item){
    options.select(item.index - 1);
  })

  list.key('up', function(){
    if(now==1) return;
    showLineNumber(--now, length);
  });

  list.key('down', function(){
    if(now==length) return;
    showLineNumber(++now, length);
  });

}

function showLineNumber(now, total){
  titleBar.setLine(3, '目前文章：' + now + '/' + total);
  screen.render();
}