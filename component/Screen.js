module.exports = function(blessed){
  return blessed.screen({
    smartCSR: true,
    fullUnicode: true
  });
}