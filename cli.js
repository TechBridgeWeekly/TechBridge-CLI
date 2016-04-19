#!/usr/bin/env node

var open = require("open");
var request = require('request');
var cheerio = require('cheerio');

var view = require('./view');
var api = require('./api');


view.init({
  title: 'TechBridge 技術日報(Today)'
})

view.loading();
renderMain();

function renderMain(){
  api.getCategory(function(err, items){
    if(err){
      console.log(err);
      process.exit(1);
    }

    view.render({
      type: 'main',
      items: items,
      getTitle: function(item){
        return item.title;
      },
      select: function(index){
        view.loading();
        renderCategory(items[index].name);
      }
    })
  });
}

function renderCategory(name){
  api.getItems(name, 1, function(err, items){
    if(err){
      console.log(err);
      process.exit(1);
      return;
    }

    view.render({
      type: 'page',
      items: items,
      getTitle: function(item){
        
        return item.category + ' | ' + item.text;
      },
      select: function(index){
        open(items[index].url);
      },
      left: function(){
        view.loading();
        renderMain();
      }
    })
  })
}


