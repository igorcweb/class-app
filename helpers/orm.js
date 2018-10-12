const printQuestionMarks = num => {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
};

module.exports = { printQuestionMarks };
