var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'whatWeOffer';
//    locals.filters = {
//    };
    locals.data = {
        services: []
    };

//    // Load the galleries by sortOrder
//    view.query('services', keystone.list('ServiceOffering').model.find().sort('fromDate'));

    // Load all categories
    view.on('init', function(next) {

        keystone.list('ServiceOffering').model.find().sort('title').exec(function(err, results) {

            if (err || !results.length) {
                return next(err);
            }

            locals.data.services = results;

//            // Load the counts for each category
//            async.each(locals.data.categories, function(category, next) {
//
//                keystone.list('Post').model.count().where('category').in([category.id]).exec(function(err, count) {
//                    category.postCount = count;
//                    next(err);
//                });
//
//            }, function(err) {
//                next(err);
//            });
//
            next();

        });
    });
//
//    // Load the current category filter
//    view.on('init', function(next) {
//
//        if (req.params.category) {
//            keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
//                locals.data.category = result;
//                next(err);
//            });
//        } else {
//            next();
//        }
//
//    });

    // Load the services
//    view.on('init', function(next) {
//
//        var q = keystone.list('ServiceOffering').paginate({
//            page: req.query.page || 1,
//            perPage: 20,
//            maxPages: 10
//        })
//            .where('state', 'published')
//            .sort('-fromDate')
//            .populate('author');
//
//        q.exec(function(err, results) {
//            locals.data.services = results;
//            next(err);
//        });
//
//    });

    // Render the view
    view.render('whatWeOffer');

};
