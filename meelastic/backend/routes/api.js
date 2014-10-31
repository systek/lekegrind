var express = require('express');
var router = express.Router();
var elasticClient = require('../lib/elasticClient');

router.get('/', function (req, res) {
    res.send('Nothing here');
});

router.get('/count', function (req, res) {
    elasticClient.indices.stats({},
        function (error, data) {
            res.send('' + data.indices.lekegrind.total.docs.count);
        });
});

router.get('/query/:query', function (req, res) {
    console.log("Searching for: " + req.params.query);
    elasticClient.search({
        index: 'lekegrind',
        type: 'meelastic',
        body: {
            query: {
                "multi_match": {
                    "query": req.params.query,
                    "fields": [ "group.group_topics.topic_name", "member.member_name", "event.event_name", "venue.venue_name" ]
                }
            }
        },
        size: 100
    }).then(function (resp) {
        console.log("Search results: " + resp.hits.total);
        res.send(resp);
    }, function (err) {
        console.trace(err.message);
        res.send(err.message);
    });

});

router.get('/toplist/:query', function (req, res) {
    console.log("Searching for toplist: " + req.params.query)
    elasticClient.search({
        index: 'lekegrind',
        type: 'meelastic',
        body: {
            "facets": {
                "tags": {
                    "terms": {
                        "field": req.params.query,
                        size: 100
                    }
                }
            }
        }
    }).then(function (resp) {
        console.log("Top list hits: " + resp.hits.total);
        res.send(resp);
    }, function (err) {
        console.trace(err.message);
        res.send(err.message);
    });

});

module.exports = router;
