/**
 * Created by lizhen on 5/28/2016.
 */
var React = require('react');

var Notifier = React.createClass({
  statics: {
    start: function(title, context, url, icon, name) {
      console.log('icon', icon);
      name=name||("notiwin"+(function(n) {
        var rnd = "";
        for (var i = 0; i < n; i++)
          rnd += Math.floor(Math.random() * 10);
        return rnd;
      })(5));
      if (!Notification) {
        console.log("Your browser is not support desktop notifications, please try Chrome or Firefox.");
        return false;
      }

      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      } else {
        var notification = new Notification(title, {
          icon: icon,
          body: context,
        });
        notification.onclick = function() {
          window.focus();
          notification.close();
        };
      }
    }
  },

  shouldComponentUpdate: function() {
    return false;
  },

  getScript: function() {
    var script = 'document.addEventListener("DOMContentLoaded", function () { if (Notification.permission !== "granted") Notification.requestPermission(); });';
    return script;
  },

  render: function() {
    return React.createElement("script", {
      type: "text/javascript",
      dangerouslySetInnerHTML: {
        __html: this.getScript()
      }
    });
  }
});

module.exports = Notifier;
