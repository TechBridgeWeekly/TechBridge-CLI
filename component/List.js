module.exports = function(blessed, items){
  return blessed.List({
    bottom: true,
    width: '100%',
    height: '80%',
    items: items,
    vi: true,
    tags: true,
    keys: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'green',
      bg: 'black',
      border: {
        fg: '#f0f0f0'
      },
      selected: {
        fg: 'black',
        bg: 'white'
      }
    }
  });
}