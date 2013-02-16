/**
 * @author Benjamin Goering - https://github.com/gobengo
 */
(function (window, $) {

if ( ! window.Hub ) window.Hub = {};

/**
 * HottestConvs displays a list of the Hottest Conversations (Collections) in a
 * StreamHub Network
 * @constructor Hub.HottestConvs
 * @alias module:Hub.HottestConvs
 * @param {Object} opts - Options
 * @param {HTMLElement} opts.el - An HTML Element to render in
 * @param {String} opts.network - The StreamHub Network to show Collections from
 * @param {String} opts.template - A template to use for the element housing the widget
 * @param {String} opts.convTemplate - A template to use for the element for each Conllection
 */
var HottestConvs = window.Hub.HottestConvs = function HottestConvs (opts) {
	var self = this;
	this.el = opts.el;
	this.$el = $(opts.el);
	this.network = opts.network;
	this.template = opts.template || HottestConvs.template;
	this.convTemplate = opts.convTemplate || HottestConvs.convTemplate;
	var reqXhr = HottestConvs.request(opts);
	reqXhr.success(function (resp) {
		var data = resp.data,
			$ul = self.$el.find('.hub-hottest-convs');
		$(data).each(function (index, conv) {
			var $li = $('<li></li>'),
				roundedHeat = roundNumber(conv.heat, 2);
			$li.html(HottestConvs.convTemplate
				.replace('{{ title }}', conv.title)
				.replace('{{ heat }}', roundedHeat)
				.replace('{{ url }}', conv.url) );
			$ul.append($li);
		});
	})
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
 * Create a jQuery XHR Object for a HottestConvs request.
 * @param {Object} opts - Options
 * @param {String} opts.network - The StreamHub Network to request Hot Convs for
 */
HottestConvs.request = function (opts) {
	var url = 'http://bootstrap.'+ opts.network +'/api/v3.0/hottest/',
		jqXhr = $.get(url);
	return jqXhr;
};

/**
 * Render the widget HTML into this.$el. This is important.
 */
HottestConvs.prototype.render = function () {
	this.$el.html(this.template);
};

/**
 * The Template to use for the widget itself. Used by `.render()`
 */
HottestConvs.template = '<div class="hub-HottestConvs"><ul class="hub-hottest-convs"></ul></div>';

/**
 * The template to use for each of the Hottest Convs
 */
HottestConvs.convTemplate = '<li>{{ heat }} - <a href="{{ url }}" target="_blank">{{ title }}</a></li>';

}(this, jQuery));