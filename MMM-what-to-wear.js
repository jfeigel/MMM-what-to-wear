/* global Module */

/* Magic Mirror
 * Module: MMM-what-to-wear
 *
 * By James Feigel
 * MIT Licensed.
 */

Module.register("MMM-what-to-wear", {
	defaults: {
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror
	matrix: {
		"hot": {
			"sunny": ["tshirt", "shorts", "shoes"],
			"windy": ["tshirt", "shorts", "shoes"],
			"rain": ["tshirt", "shorts", "boots"],
			"snow": ["jacket", "long-sleeves", "pants", "boots"]
		},
		"warm": {
			"sunny": ["tshirt", "shorts", "shoes"],
			"windy": ["tshirt", "shorts", "shoes"],
			"rain": ["tshirt", "shorts", "boots"],
			"snow": ["jacket", "long-sleeves", "pants", "boots"]
		},
		"cool": {
			"sunny": ["tshirt", "pants", "shoes"],
			"windy": ["long-sleeves", "pants", "shoes"],
			"rain": ["long-sleeves", "pants", "boots"],
			"snow": ["jacket", "long-sleeves", "pants", "boots"]
		},
		"cold": {
			"sunny": ["jacket", "long-sleeves", "pants", "shoes"],
			"windy": ["jacket", "long-sleeves", "pants", "shoes"],
			"rain": ["jacket", "long-sleeves", "pants", "boots"],
			"snow": ["jacket", "long-sleeves", "pants", "boots"]
		}
	},

	getStyles: function() {
		return ["MMM-what-to-wear.css"];
	},

	start: function() {
		var self = this;

		//Flag for check if module is loaded
		this.loaded = false;
	},

	getDom: function() {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		if (this.clothing) {
			this.clothing.forEach(function(item) {
				var icon = document.createElement("i");
				icon.className = "icon-" + item;
				wrapper.appendChild(icon);
			});
		} else {
			wrapper.innerHTML = "Getting Weather...";
		}

		return wrapper;
	},

	processData: function(data) {
		var self = this;
		var temp, condition;

		if (data.maxTemp >= 80) {
			temp = "hot";
		} else if (data.maxTemp < 80 && data.maxTemp >= 70) {
			temp = "warm";
		} else if (data.maxTemp < 70 && data.maxTemp >= 60) {
			temp = "cool";
		} else {
			temp = "cold";
		}

		switch (data.icon) {
			case "wi-cloudy-windy": condition = "windy"; break;
			case "wi-showers":
			case "wi-rain":
			case "wi-thunderstorm": condition = "rain"; break;
			case "wi-snow": condition = "snow"; break;
			default: condition = "sunny";
		}

		this.clothing = this.matrix[temp][condition];

		if (this.loaded === false) { self.updateDom(self.config.animationSpeed) ; }
		this.loaded = true;
	},

	notificationReceived: function (notification, payload, sender) {
		var self = this;

		if (notification === "MODULE_RESUMED" && sender.name === "weatherforecast") {
			self.sendNotification("GET_WEATHERFORCAST", 1);
		}

		if (notification === "WEATHERFORECAST-MMM-what-to-wear") {
			self.processData(payload[0]);
		}
	},
});
