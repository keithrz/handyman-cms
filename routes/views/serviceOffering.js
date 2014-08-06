var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Set locals
    locals.section = 'whatWeOffer';
    locals.filters = {
        serviceOffering: req.params.serviceOffering
    };
    locals.data = {
        serviceOfferings: []
    };

    // Load the current serviceOffering
    view.on('init', function(next) {

        var q = keystone.list('ServiceOffering').model.findOne({
            state: 'published',
            slug: locals.filters.serviceOffering
        }).populate('author');

        q.exec(function(err, result) {
            locals.data.serviceOffering = result;
            next(err);
        });

    });

//    // Load other serviceOfferings
//    view.on('init', function(next) {
//
//        var q = keystone.list('ServiceOffering').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');
//
//        q.exec(function(err, results) {
//            locals.data.serviceOfferings = results;
//            next(err);
//        });
//
//    });

    // Render the view
    view.render('serviceOffering');

};
