/**
 * @author Benjamin Goering - https://github.com/gobengo
 */
(function (window, $) {

if ( ! window.Hub ) window.Hub = {};

/**
 * HotCollections displays a list of Hot Collections in a
 * StreamHub Network
 * @constructor Hub.HotCollections
 * @alias module:Hub.HotCollections
 * @param {Object} opts - Options
 * @param {HTMLElement} opts.el - An HTML Element to render in
 * @param {String} opts.network - The StreamHub Network to show Collections from
 * @param {String} opts.template - A template to use for the element housing the widget
 * @param {String} opts.collectionTemplate - A template to use for the element for each Conllection
 */
var HotCollections = window.Hub.HotCollections = function HotCollections (opts) {
	var self = this;
	this.el = opts.el;
	this.$el = $(opts.el);
	this.network = opts.network;
	this.template = opts.template || HotCollections.template;
	this.collectionTemplate = opts.collectionTemplate || HotCollections.collectionTemplate;

	// Render initial HTML into element
	this.$el.html(this.template);

	// Request the heat API and render results
	var reqXhr = HotCollections.request(opts);
	reqXhr.success(function (resp) {
		var data = resp.data,
			$ul = self.$el.find('.hub-collection-list');
		$(data).each(function (index, collection) {
			var $li = $('<li></li>'),
				roundedHeat = roundNumber(collection.heat, 2);
			$li.html(HotCollections.collectionTemplate
				.replace('{{ title }}', collection.title)
				.replace('{{ heat }}', roundedHeat)
				.replace('{{ url }}', collection.url) );
			$ul.append($li);
		});
	});

	return this;
};

/**
 * Round a floating point number to a specified number of digits.
 * Used to round Heat Index values
 */
function roundNumber(number, digits) {
    var multiple = Math.pow(10, digits);
    var rndedNum = Math.round(number * multiple) / multiple;
    return rndedNum;
}

/**
 * Create a jQuery XHR Object for a HotCollections request.
 * @param {Object} opts - Options
 * @param {String} opts.network - The StreamHub Network to request Hot Collections from
 */
HotCollections.request = function (opts) {
	var url = 'http://bootstrap.'+ opts.network +'/api/v3.0/hottest/',
		jqXhr = $.get(url);
	return jqXhr;
};

/**
 * The Template to use for the widget itself. Used by `.render()`
 */
HotCollections.template = '<div class="hub-HotCollections"><ul class="hub-collection-list"></ul></div>';

/**
 * The template to use for each of the Hot Collections
 */
HotCollections.collectionTemplate = '<li>{{ heat }} - <a href="{{ url }}" target="_blank">{{ title }}</a></li>';

}(this, jQuery));