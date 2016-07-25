import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import mongo from 'mongodb';
import monk from 'monk';

/* eslint-isable no-console */

const port = 3036;
const app = express();
const compiler = webpack(config);
const db = monk('localhost:27017/ombud');

app.get('/mostComplaints', function(req, res) {
  let choice = req.headers["x-custom-header"];
  let collection = db.collection('consumer_complaints');
  console.log('choice:::', choice);
  collection.aggregate(
    [{$match: {"State" : choice}}, {$group: {_id: "$Product", "count": {$sum: 1}}}, {$sort: {"count": -1}}, {$limit: 1}], function(e, data) {
      res.json(data[0]._id);
  });
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
