var request = require('request');
var cheerio = require('cheerio');

var API_ENDPOINT = 'https://www.techbridge.cc/api/v1/shares';

var API = {
  
  getCategory: function(callback){
    var data = [
      {
        title: '最新文章(New)',
        name: 'all'
      }, {
        title: '新聞時事(News)',
        name: 'news'
      }, {
        title: '技術綜合(Technology)',
        name: 'technology'
      }, {
        title: '職場經驗分享(Career)',
        name: 'career'
      }, {
        title: '程式語言(Programming)',
        name: 'programming'
      }, {
        title: '網頁前端(Web Front End)',
        name: 'frontend'
      }/*, {
        title: '網頁後端(Web Back End)',
        name: 'backend'
      }, {
        title: '行動網路(Mobile)',
        name: 'mobile'
      }, {
        title: '數據分析(Data)',
        name: 'data'
      }, {
        title: '使用者經驗設計(UI/UX)',
        name: 'uiux'
      }, {
        title: '創客/物聯網(Maker/IoT)',
        name: 'maker'
      }, {
        title: '虛擬實境(VR/AR)',
        name: 'vrar'
      }, {
        title: '創新創業(Startup)',
        name: 'startup'
      }, {
        title: '技術活動(Events)',
        name: 'events'
      }, {
        title: '產品專案分享(Product)',
        name: 'product'
      }, {
        title: '閒聊(Talk)',
        name: 'talk'
      }, {
        title: '推薦書籍(Books)',
        name: 'books'
      }, {
        title: '產品專案分享(Product)',
        name: 'product'
      }, {
        title: '其他(Others)',
        name: 'others'
      }*/
    ];
    callback(null, data);
  },

  getItems: function(category, page, callback){
    var url = API_ENDPOINT + '/' + category +'/new?page=' + page;
    request(url, function(error, res, body){

      if(error){
        return callback(error);
      }
      
      var json = JSON.parse(body);
      if(!json.data.data) return callback(new Error('no data'));

      var items = json.data.data.map(function(element){
        return {
          text: element.title,
          category: element.category_name,
          url: element.link
        };
      })

      callback(null, items);
    })
  }
}

module.exports = API;