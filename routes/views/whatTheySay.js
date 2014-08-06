var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'whatTheySay';
//    locals.filters = {
//    };
    locals.data = {
        testimonials: []
    };

//    // Load the galleries by sortOrder
//    view.query('testimonials', keystone.list('Testimonial').model.find().sort('fromDate'));

    // Load all categories
    view.on('init', function(next) {

        keystone.list('Testimonial').model.find({state: 'published'}).sort('fromDate').exec(function(err, results) {

            if (err || !results.length) {
                return next(err);
            }

            locals.data.testimonials = results;

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

    // Load the testimonials
//    view.on('init', function(next) {
//
//        var q = keystone.list('Testimonial').paginate({
//            page: req.query.page || 1,
//            perPage: 20,
//            maxPages: 10
//        })
//            .where('state', 'published')
//            .sort('-fromDate')
//            .populate('author');
//
//        q.exec(function(err, results) {
//            locals.data.testimonials = results;
//            next(err);
//        });
//
//    });

    // Render the view
    view.render('whatTheySay');

};
