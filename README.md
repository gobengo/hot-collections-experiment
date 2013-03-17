# StreamHub-HotCollections

StreamHub-HotCollections is a widget that lists the Hottest Collections within a Livefyre StreamHub Network.

[Livefyre StreamHub](http://www.livefyre.com/streamhub/) is the web's first Engagement Management System. StreamHub turns your site into a real-time social experience. Curate images, videos, and Tweets from across the social web, right into live blogs, chats, widgets, and dashboards. The world's biggest publishers and brands use StreamHub to power their online Content Communities.

# Usage

Include `main.js` in your HTML page

	<script src="/path-to-HotCollections/main.js"></script>

Specify a StreamHub `network` and HTML Element `el` to render the widget in

	var hottestConvs = new Hub.HottestConvs({
		network: 'techcrunch.fyre.co',
		el: document.getElementById('example')
	}).render();

# Documentation

The code is documented with jsdoc3.