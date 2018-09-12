printQuestionMarks = function(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
};

module.exports = { printQuestionMarks };
