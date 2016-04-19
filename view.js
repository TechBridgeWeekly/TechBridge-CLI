var blessed = require('blessed');
var Screen = require('./component/Screen');
var LoadingBox = require('./component/LoadingBox');
var List = require('./component/List');
var TitleBar = require('./component/TitleBar');

var screen, list, loadingBox, titleBar;
var prevIndex = 0;

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
  var length = options.items.length;
  var items = options.items.map(function(item){
    return options.getTitle(item);
  });

  if(list){
    screen.remove(list);
    list.setItems([])
    list.destroy();
    list = null;
  }

  titleBar = TitleBar(blessed);
  list = List(blessed, items);

  if(loadingBox){
    loadingBox.destroy();
  }

  screen.append(titleBar);
  screen.append(list);
  showLineNumber(1, length);

  if(options.type=='main'){
    list.select(prevIndex);
    showLineNumber(prevIndex+1, length);
  }

  list.focus();
  screen.render();

  list.on('select', function(item){
    var index = item.index - item.parent.index - 1;
    if(options.type=='main') prevIndex = index;
    options.select(index);
  })

  list.key('right', function(){
    if(options.type=='main') prevIndex = this.selected;
    options.select(this.selected);
  })

  list.key('up', function(){
    showLineNumber(this.selected+1, length);
  });

  list.key('down', function(){
    showLineNumber(this.selected+1, length);
  });

  list.key('pagedown', function(){
    list.move(10);
    showLineNumber(this.selected+1, length);
  })

  list.key('pageup', function(){
    list.move(-10);
    showLineNumber(this.selected+1, length);
  })

  list.key('left', options.left || function(){});

}

function showLineNumber(now, total){
  titleBar.setLine(3, '目前文章：' + now + '/' + total);
  screen.render();
}