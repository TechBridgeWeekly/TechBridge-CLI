module.exports = function(blessed){
  var content = [
    '歡迎使用 TechBridge 技術日報 CLI 版本',
    '可用上下鍵移動並按 Enter 開啟連結',
    'ESC, q, Ctrl + C 可離開本程式',
  ].join('\n');

  return blessed.box({
    top: 'top',
    width: '100%',
    height: '20%',
    content: content,
    style: {
      fg: 'white',
      bg: 'grey',
      border: {
        fg: '#f0f0f0'
      }
    }
  });
}