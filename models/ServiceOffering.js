var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var ServiceOffering = new keystone.List('ServiceOffering', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

ServiceOffering.add({
    title: { type: String, required: true },
    description: { type: String, index: true },
//    location: { type: String },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 150 },
        extended: { type: Types.Html, wysiwyg: true, height: 400 }
    }
});

ServiceOffering.schema.virtual('content.full').get(function() {
    return this.content.extended || this.content.brief;
});

ServiceOffering.defaultColumns = 'title, description, state|20%, author|20%, publishedDate|20%';
ServiceOffering.register();
