
$(document).ready(function(){
  //$('#switcher').themeswitcher();
  bgPage = chrome.extension.getBackgroundPage();
  restore_options();

  $("#save").click(function(e) {
  var lang = document.getElementById("lang");
  localStorage["language"] = lang.children[lang.selectedIndex].value;

  period = document.getElementById("update");
  localStorage["update_period"] = period.children[period.selectedIndex].value;

  notification = document.getElementById("notification");
  localStorage["notification"] = notification.children[notification.selectedIndex].value;

  notification_time = document.getElementById("notification_time");
  localStorage["notification_time"] = notification_time.children[notification_time.selectedIndex].value;

  icon = document.getElementById("icon");
  localStorage["icon"] = icon.children[icon.selectedIndex].value;

  theme = document.getElementById("theme");
  localStorage["theme"] = theme.children[theme.selectedIndex].value;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function(){status.innerHTML = "";}, 1000);

})

});




// Restores select box state to saved value from localStorage.
function restore_options() {
  var my_lang = localStorage["language"];
  if (!my_lang) {
    return;
  }
  var select = document.getElementById("lang");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == my_lang) {
      child.selected = "true";
      break;
    }
  }
	
  var my_period = localStorage["update_period"];
  var period = document.getElementById("update");
  for (var i = 0; i < period.children.length; i++) {
    var child = period.children[i];
    if (child.value == my_period) {
      child.selected = "true";
      break;
    }
  }

  var my_notification = localStorage["notification"];
  var notification = document.getElementById("notification");
  for (var i = 0; i < notification.children.length; i++) {
    var child = notification.children[i];
    if (child.value == my_notification) {
      child.selected = "true";
      break;
    }
  }
  
  var my_notification_time = localStorage["notification_time"];
  var notification_time = document.getElementById("notification_time");
  for (var i = 0; i < notification_time.children.length; i++) {
    var child = notification_time.children[i];
    if (child.value == my_notification_time) {
      child.selected = "true";
      break;
    }
  }

  var my_icon = localStorage["icon"];
  var icon = document.getElementById("icon");
  for (var i = 0; i < icon.children.length; i++) {
    var child = icon.children[i];
    if (child.value == my_icon) {
      child.selected = "true";
      break;
    }
  }
  
  var my_theme = localStorage["theme"];
  var theme = document.getElementById("theme");
  for (var i = 0; i < theme.children.length; i++) {
    var child = theme.children[i];
    if (child.value == my_theme) {
      child.selected = "true";
      break;
    }
  }
  
}