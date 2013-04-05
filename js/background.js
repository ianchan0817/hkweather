if(localStorage["language"] == "ENG" || localStorage["language"] == "CHI" ){
	
}
else{
	localStorage["language"] = "CHI";
	localStorage["update_period"] = 900;
	localStorage["notification"] = "off";
	localStorage["notification_time"] = "0"; 
	localStorage["icon"] = 30; 
	localStorage["theme"] = "black-tie"; 
}

//URL path

var content_url_en="http://www.weather.gov.hk/contente.htm";
var warning_url_en = "http://www.hko.gov.hk/textonly/warning/warn.htm";
var local_url_en = "http://www.hko.gov.hk/textonly/forecast/local.htm";
var SevernDay_url_en = "http://www.hko.gov.hk/textonly/forecast/nday.htm";
var detail_en = "http://www.hko.gov.hk/textonly/warning/detail.htm";
var air_en = "http://www.epd-asg.gov.hk/textonly/eindex.html";


var content_url_ch="http://www.weather.gov.hk/contentc.htm";
var local_url_ch = "http://www.hko.gov.hk/textonly/forecast/localc.htm";
var warning_url_ch = "http://www.hko.gov.hk/textonly/warning/warnc.htm";
var SevernDay_url_ch = "http://www.hko.gov.hk/textonly/forecast/ndayc.htm";
var detail_ch = "http://www.hko.gov.hk/textonly/warning/detailc.htm";
var air_ch = "http://www.epd-asg.gov.hk/textonly/cindex.html";

var typhoon_ch = "http://www.hko.gov.hk/wxinfo/currwx/tc_fixarea_c.htm";
var typhoon_en = "http://www.hko.gov.hk/wxinfo/currwx/tc_fixarea_e.htm";
var mtsat="http://www.weather.gov.hk/wxinfo/intersat/mtsat/satpic_s.shtml";

init();

function init() {
	my_lang = localStorage["language"];
	if (my_lang == "CHI"){
		$.ajax({
			url: content_url_ch,
			cache: false,
			success: function(html){
				parse_content(html);

			}
		});

		$.ajax({
			url: local_url_ch,
			cache: false,
			success: function(html){
				parse_local(html);
			}
		});

		$.ajax({
			url: detail_ch,
			cache: false,
			success: function(html){
				parse_detail(html);
			}
		});

		$.ajax({
			url: air_ch,
			cache: false,
			success: function(html){
				parse_air(html);
			}
		});
		/*
		$.ajax({
			url: SevernDay_url_ch,
			cache: false,
			success: function(html){
				//console.log(html);
			}
		});
		*/		
	} else {
		$.ajax({
			url: content_url_en,
			cache: false,
			success: function(html){
				parse_content(html);

			}
		});

		$.ajax({
			url: local_url_en,
			cache: false,
			success: function(html){
				parse_local(html);
			}
		});

		$.ajax({
			url: detail_en,
			cache: false,
			success: function(html){
				parse_detail(html);
			}
		});	

		$.ajax({
			url: air_en,
			cache: false,
			success: function(html){
				parse_air(html);
			}
		});	

	}

	$.ajax({
		url: mtsat,
		cache: false,
		success: function(html){
			parse_mtsat(html);
		}
	});
	setTimeout("init()", localStorage["update_period"]*1000);
}

//Function 
function getDate() {
	return date;
}


function getWarnings(){
	if(my_lang == "CHI"){
		warnings = warnings.replace(/ /g, "");
	}
	return warnings;
}

function getLocal(){
	//console.log("local =" + local);
	if(my_lang == "CHI"){
		local = local.replace(/ /g, "");
	}
	return local;
}

function getCurrent(){
	//console.log("current =" + current);
	if(my_lang == "CHI"){
		current = current.replace(/ /g, "");
	}
	return current;
}

function getDistrict(){
	//console.log("district =" + district);
	return district;
}

function getDetail(){
	
	if(my_lang == "CHI"){
		detail = detail.replace(/ /g, "");
	}
	
	return detail;
}


function getReady(){
	return ready;
}

function getCurrentPicture(){
	return CurrentPicture;
}

function getSeven_day_array(i, j){
	return seven_day_array[i][j];
}

function getDay1(){
	return day1;
}

function getDay2(){
	return day2;
}

function getDay3(){
	return day3;
}

function getDay4(){
	return day4;
}

function getDay5(){
	return day5;
}

function getDay6(){
	return day6;
}

function getDay7(){
	return day7;
}

function getHead(){
	if(my_lang == "CHI"){
		head = head.replace(/ /g, "");
	}
	return head;
}

function getFoot(){
	if(my_lang == "CHI"){
		foot = foot.replace(/ /g, "");
	}
	return foot;
}

function getDay1Message(){
	if(my_lang == "CHI"){
		day1_message = day1_message.replace(/ /g, "");
	}
	return day1_message;
}

function getDay2Message(){
	if(my_lang == "CHI"){
		day2_message = day2_message.replace(/ /g, "");
	}
	return day2_message;
}

function getDay3Message(){
	if(my_lang == "CHI"){
		day3_message = day3_message.replace(/ /g, "");
	}
	return day3_message;
}

function getDay4Message(){
	if(my_lang == "CHI"){
		day4_message = day4_message.replace(/ /g, "");
	}
	return day4_message;
}

function getDay5Message(){
	if(my_lang == "CHI"){
		day5_message = day5_message.replace(/ /g, "");
	}
	return day5_message;
}

function getDay6Message(){
	if(my_lang == "CHI"){
		day6_message = day6_message.replace(/ /g, "");
	}
	return day6_message;
}

function getDay7Message(){
	if(my_lang == "CHI"){
		day7_message = day7_message.replace(/ /g, "");
	}
	return day7_message;
}
function checkWarning(i){
	return warning_appear[i];
}

function getWarningIcon(i){
	return warning_icon[i];
}

function getName(){
	return typhoonName;
}

function getImage(){
	return typhoonImg;
}

function checkTyphoon(){
	return typhoon;
}

function updateIcon(){
	icon_no = 1;
	clearInterval(update_icon);
	for (i = 0; i <21; i++){
		if(warning_appear[i] == true){
			iconArray[icon_no] = warning_icon[i];
			icon_no++;
		}
	}
	//console.log("icon_no = " + icon_no);
	if(icon_no != 1){
		update_icon = setInterval("changeIcon()", localStorage["icon"]*1000);
	}
}

function changeIcon(){
	//console.log(icon_changing);
	chrome.browserAction.setIcon({path:iconArray[icon_changing]});
	if (icon_changing == icon_no-1){
		icon_changing = 0;
	}
	else{
		icon_changing++;
	}
	//console.log(icon_changing);
}

function getCurrentTime(){
	return currentTime;
}

function getCurrentTemp(){
	return currentTemp;
}

function getCurrentRH(){
	return currentRH;
}

function getCurrentUVI(){
	return currentUVI;
}

function getCurrentIntensity(){
	/*
	if(currentIntensity != "" )
		currentIntensity = "(" + currentIntensity + ")";
	*/
	return currentIntensity;
}

function getTideHighLow(num, index){
	if(index == "1"){
		if(tideHighLow[num][index].match("m") || tideHighLow[num][index].match("米"))
			return tideHighLow[num][index];
		else
			return "";
	}else{
		if(tideHighLow[num][index].match("'") || tideHighLow[num][index].match(","))
			return "";
		else
			return tideHighLow[num][index];
	}
}

function getCurrentSeaTemp(){
	return currentSeaTemp;
}

function getSunUp(){
	return sunUp;
}

function getSunDown(){
	return sunDown;
}

function getMoonUp(){
	return moonUp;
}

function getMoonDown(){
	return moonDown;
}

function getMoonPhase(){
	return moonPhase;
}

function getCurrentPicture(){
	return currentPicture;
}

function get7DaysMessageDate_en(data){
	value = data.substring(data.indexOf("第 一 天 插 圖 編 號 ")+14, data.indexOf("第 一 天 插 圖 編 號 ")+16);		
}

function get7DaysMessageDate_en(data){
	return data.substring(data.indexOf("(")-5, data.indexOf("("));
}

function get7DaysMessageDay_en(data){
	return data.substring(data.indexOf("(")+1, data.indexOf(")"));
}

function get7DaysMessageWind_en(data){
	return data.substring(data.indexOf("Wind:")+6, data.indexOf("Weather:"));
}

function get7DaysMessageWeather_en(data){
	return data.substring(data.indexOf("Weather:")+9, data.indexOf("Temp"));
}

function get7DaysMessageTemp_en(data){
	return data.substring(data.indexOf("Temp")+12, data.indexOf("R.H."));
}

function get7DaysMessageRH_en(data){
	return data.substring(data.indexOf("R.H.")+12);
}

function get7DaysMessageDate_ch(data){
	return data.substring(data.indexOf("月")-1, data.indexOf("("));
}

function get7DaysMessageDay_ch(data){
	return data.substring(data.indexOf("(")+1, data.indexOf(")"));
}

function get7DaysMessageWind_ch(data){
	return data.substring(data.indexOf("風")+3, data.indexOf("天氣"));
}

function get7DaysMessageWeather_ch(data){
	return data.substring(data.indexOf("天氣")+3, data.indexOf("氣溫"));
}

function get7DaysMessageTemp_ch(data){
	return data.substring(data.indexOf("氣溫")+3, data.indexOf("相對"));
}

function get7DaysMessageRH_ch(data){
	return data.substring(data.indexOf("相對")+5);
}

function getMtsat(num){
	return mtsatImg[num];
}

function getAirTitle() {
	return air_title;
}

function getAirStation(i, j) {
	return air_station[i][j];
}




