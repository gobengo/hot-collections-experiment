(function (window, $) {

if ( ! window.Hub ) window.Hub = {};

var HottestConvs window.Hub.HottestConvs = function HottestConvs (opts) {
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
			$ul.prepend($li);
		});
	})
	return this;
};

function roundNumber(number, digits) {
    var multiple = Math.pow(10, digits);
    var rndedNum = Math.round(number * multiple) / multiple;
    return rndedNum;
}

HottestConvs.request = function (opts) {
	var url = 'http://bootstrap.'+ opts.network +'/api/v3.0/hottest/',
		jqXhr = $.get(url);
	return jqXhr;
};

HottestConvs.prototype.render = function () {
	this.$el.html(this.template);
};

HottestConvs.template = '<div class="hub-HottestConvs"><ul class="hub-hottest-convs"></ul></div>';

HottestConvs.convTemplate = '<li>{{ heat }} - <a href="{{ url }}" target="_blank">{{ title }}</a></li>';

}(this, jQuery));