import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import mongo from 'mongodb';
import monk from 'monk';

/* eslint-isable no-console */

const port = 3037;
const app = express();
const compiler = webpack(config);
const db = monk('localhost:27017/ombud');

app.get('/mostComplaints', function (req, res) {
    let choice = req.headers["x-custom-header"];
    let collection = db.collection('consumer_complaints');
    collection.aggregate(
        [{
            $match: {
                "State": choice
            }
        }, {
            $group: {
                _id: "$Product",
                "count": {
                    $sum: 1
                }
            }
        }, {
            $sort: {
                "count": -1
            }
        }, {
            $limit: 1
        }],
        function (e, data) {
            res.json(data[0]._id);
        });
});

app.get('/fastestGrowing', function (req, res) {
    let choice = req.headers["x-custom-header"];
    db.collection('consumer_complaints').aggregate([{
        $match: {
            "Product": choice
        }
    }, {
        $group: {
            _id: "$State",
            "count": {
                $sum: 1
            }
        }
    }, {
        $sort: {
            "count": -1
        }
    }, {
        $limit: 10
    }], function (e, data) {
        let topTenComplaints = data.slice(0, 11);
        db.collection('state_populations').find({
            $where: "this.ESTIMATESBASE2010 < this.POPESTIMATE2015"
        }).then((data) => {
            let fastestGrowingStates = data.sort((a, b) => parseFloat(b.POPDIFF) - parseFloat(a.POPDIFF)).map(currentObj => {
                return {
                    POPDIFF: currentObj.POPDIFF,
                    NAME: currentObj.STATEA
                };
            }).filter(currentObj => currentObj.POPDIFF > 100000).slice(0, 10);
            let determinedStates = [];
            topTenComplaints.forEach((complaint) => {
                let complaintState = complaint._id;
                for (let key in fastestGrowingStates) {
                    if (fastestGrowingStates[key].NAME === complaintState) {
                        determinedStates.push({
                            state: fastestGrowingStates[key].NAME,
                            populationDiff: fastestGrowingStates[key].POPDIFF,
                            complaintCount: complaint.count
                        });
                    }
                }
            });
            res.json(determinedStates.sort((a, b) => parseFloat(b.complaintCount) - parseFloat(a.complaintCount)).slice(0, 5));
        });
    });
});

app.get('/births', function (req, res) {
    let choice = req.headers["x-custom-header"];
    let birthsSortedForComplaint = [];
    db.collection('consumer_complaints').aggregate([{
        $match: {
            "Company": choice
        }
    }, {
        $group: {
            _id: "$State",
            "count": {
                $sum: 1
            }
        }
    }, {
        $sort: {
            "count": -1
        }
    }, {
        $limit: 100
    }], function (e, complaintData) {
        db.collection('state_populations').find({}).then((stateData) => {
            complaintData.forEach((complaintState) => {
                stateData.forEach((state) => {
                    if (complaintState._id === state.STATEA) {
                        birthsSortedForComplaint.push({
                            state: complaintState._id,
                            "2010": state["BIRTHS2010"],
                            "2011": state["BIRTHS2011"],
                            "2012": state["BIRTHS2012"],
                            "2013": state["BIRTHS2013"],
                            "2014": state["BIRTHS2014"],
                            "2015": state["BIRTHS2015"]
                        });
                    }
                });
            });

            res.json(birthsSortedForComplaint);
        });
    });
});

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});