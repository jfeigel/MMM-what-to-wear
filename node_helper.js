/* Magic Mirror
 * Node Helper: MMM-what-to-wear
 *
 * By James Feigel
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
	}
});
