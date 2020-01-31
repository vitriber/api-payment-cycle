const _ = require('lodash');
const BillingCycle = require('../billingCycle/billingCicle');

function getSummary(req, res) {
    BillingCycle.aggregate({
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$depts.value"}}
    },{
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    },{
        $project: {_id: 0, credit: 1, debt: 1}
    }, function(error, result){
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json(_.defaults(result[0], {credit:0, debt: 0}))
        }
    })
}