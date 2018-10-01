import orm from '../config/orm';

const Class = {
  insertOne: (table, cols, vals, cb) => {
    orm.insertOne(table, cols, vals, result => {
      cb(result);
    });
  },
  selectAll: (table, cb) => {
    orm.selectAll(table, results => {
      cb(results);
    });
  },
  findOne: (col, table, condition, cb) => {
    orm.findOne(col, table, condition, result => {
      cb(result);
    });
  },
  updateOne: (table, values, condition, cb) => {
    orm.updateOne(table, values, condition, result => {
      cb(result);
    });
  }
};

export default Class;
