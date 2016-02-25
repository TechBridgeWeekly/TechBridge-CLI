module.exports = function(blessed){
  return blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    content: '{bold}抓取資料中...請稍後{/bold}',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'grey',
      border: {
        fg: '#f0f0f0'
      }    
    }
  });
}