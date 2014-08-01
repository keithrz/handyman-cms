var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Testimonial = new keystone.List('Testimonial', {
	map: { name: 'from' },
	autokey: { path: 'slug', from: 'location', unique: true }
});

Testimonial.add({
    from: { type: String, required: true },
    fromDate: { type: Types.Date, index: true, required: true, default: Date.now },
    location: { type: String },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    content: { type: Types.Html, wysiwyg: true, height: 400 }
});

Testimonial.defaultColumns = 'from, fromDate, state|20%, author|20%, publishedDate|20%';
Testimonial.register();
