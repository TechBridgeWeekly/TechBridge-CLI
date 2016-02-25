var open = require("open");
var view = require('./view');
var request = require('request');
var cheerio = require('cheerio');

view.init({
  title: 'TechBridge 技術日報(Today)'
})

view.loading();

getTBItems(function(err, items){
  if(err){
    console.log(err);
    return;
  }

  view.render({
    items: items,
    getTitle: function(item){
      var category = item.category.split('(')[0];
      var len = getLength(category);
      for(var i=0;i<7-len;i++){
        category = ' ' + category + ' ';
      }
      return category + ' | ' + item.text;
    },
    select: function(index){
      open(items[index].url);
    }
  })
})

function getTBItems(callback){
  var rssUrl = "https://www.techbridge.cc/feed/all";
  request(rssUrl, function(error, response, body){
    if(error){
      return callback(error);
    }
    
    $ = cheerio.load(body);
    var items = [];
    $("entry").each(function(index, element){
      var element = $(element);
      items.push({
        text: stripTag(element.find('title').html()),
        category: stripTag(element.find('summary').html()),
        url: element.find('link').attr('href')
      });
    })

    callback(null, items);
  })
}

function stripTag(text){
  return text.replace('<!--[CDATA[', '').replace(']]-->', '');
}

function getLength(text){
  var str = encodeURIComponent(text);
  len = str.replace(/%[A-F\d]{2}/g, 'U').length;  
  return len/3;
}