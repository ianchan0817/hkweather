//Result of the request
var date = null;
var warnings = null;
var local = null;
var head = null;
var day1_message = null;
var day2_message = null;
var day3_message = null;
var day4_message = null;
var day5_message = null;
var day6_message = null;
var day7_message = null;
var foot = null;
var detail = null;

//Data variable
var currentTime = '';	
var currentTemp = 0;
var currentRH = 0;
var currentUVI = '';
var currentIntensity = '';
var currentSeaTemp = '';
var tideHighLow = new Array();
var sunUp = "";
var sunDown = "";
var moonUp = "";
var moonDown = "";
var moonPhase = "";

var alertDetail = new Array();
var message = new Array();


//icon 
var currentPicture = null;
var day1 = null;
var day2 = null;
var day3 = null;
var day4 = null;
var day5 = null;
var day6 = null;
var day7 = null;
var update_icon = null;
var iconArray = new Array();
var icon_no = 1;
var icon_changing = 0;

//Typhoon
var typhoonImg = "";
var typhoonName = "";
var typhoon = false;
var mtsatImg = new Array();

//7 days simply parse
var seven_day_array = new Array();

//Air 
var air_title = "";
var air_station = new Array();


function parse_content(html) {
	var content2 = html.substring(html.indexOf("<!-- Content 2 -->"), html.indexOf("<!-- Content 2 [End]"));
	if (my_lang == "CHI") {
		date = content2.substring(content2.indexOf('<div class="font12">')+20, content2.indexOf(' &nbsp;'));
		content2 = content2.substring(content2.indexOf(' &nbsp;')+20);
	
		date += " " + content2.substring(content2.indexOf('<div class="font12">')+20, content2.indexOf(' &nbsp;</div>'));
		content2 = content2.substring(content2.indexOf(' &nbsp;')+20);

		date += " " + content2.substring(content2.indexOf('<div class="font12">')+20, content2.indexOf(' &nbsp;</div>'));

	} else {
		date = content2.substring(content2.indexOf('<td class="Font12" valign="top">')+32, content2.indexOf('0075AB')-76);
		date += " " + content2.substring(content2.indexOf('0075AB')+18, content2.indexOf(' &nbsp;'));
	}

	
	//Get the picture
    currentPicture = html.substring(html.indexOf('<div style="margin-bottom: 5px;">')+20, html.indexOf('<div style="margin-bottom: 5px;">')+100);
    if (my_lang == "CHI") {
    	currentPicture = currentPicture.substring(currentPicture.indexOf('img src')+27, currentPicture.indexOf('width')-13);	
    } else {
    	currentPicture = currentPicture.substring(currentPicture.indexOf('img src')+27, currentPicture.indexOf('width')-11);
    }
    //console.log("currentPicture = " + currentPicture);
                

    //Common part
	var currentWxData = html.substring(html.indexOf('var CurrentWxData = new Array();'), html.indexOf('var CurrentWxData = new Array();')+500);
	//console.log("currentWxData: " + currentWxData);
	currentTime = currentWxData.substring(currentWxData.indexOf('CurrentWxData[0] = ')+20, currentWxData.indexOf('//Time')-3);
	//console.log("currentTime = " + currentTime);
	currentTemp = currentWxData.substring(currentWxData.indexOf('CurrentWxData[1] = ')+20, currentWxData.indexOf('//Temp')-3);
	//console.log("currentTemp = " + currentTemp);
	currentRH = currentWxData.substring(currentWxData.indexOf('CurrentWxData[2] = ')+20, currentWxData.indexOf('//RH')-3);
	//console.log("currentRH = " + currentRH);
	currentUVI = currentWxData.substring(currentWxData.indexOf('CurrentWxData[3] = ')+20, currentWxData.indexOf('//UVI')-4);
	if(currentUVI == "//")
		currentUVI = "";
	//console.log("currentUVI = " + currentUVI);
	currentIntensity = currentWxData.substring(currentWxData.indexOf('CurrentWxData[4] = ')+20, currentWxData.indexOf('//Intensity')-3);
	//console.log("currentIntensity = " + currentIntensity);
	currentSeaTemp = currentWxData.substring(currentWxData.indexOf('CurrentWxData[5] = ')+20, currentWxData.indexOf('//Sea Temp')-3);
	//console.log("currentSeaTemp = " + currentSeaTemp);
	//End of common part



	//Get Astron Data
	tempData = html.substring(html.indexOf('<!--Astron Table-->'), html.indexOf('<!--Astron Table End-->'));
	//console.log("tempData: " + tempData);
	
	if (my_lang == "CHI") {
		sunUp = tempData.substring(tempData.indexOf('日出')+44, tempData.indexOf('日出')+49);
		//console.log("sunUp: " + sunUp);
		sunDown = tempData.substring(tempData.indexOf('日落')+44, tempData.indexOf('日落')+49);
		//console.log("sunDown: " + sunDown);
		moonUp = tempData.substring(tempData.indexOf('月出')+44, tempData.indexOf('月出')+49);
		//console.log("moonUp: " + moonUp);
		moonDown = tempData.substring(tempData.indexOf('月落')+44, tempData.indexOf('月落')+49);
		//console.log("moonDown: " + moonDown);
		/*
		tempData = tempData.substring(tempData.indexOf('月相'), tempData.indexOf('月相')+200);
		moonPhase = tempData.substring(tempData.indexOf('<script type="text/javascript'), tempData.indexOf('</script>')+9);
		console.log("moonPhase: " + moonPhase);
		*/

	} else {
		sunUp = tempData.substring(tempData.indexOf('sunrise')+51, tempData.indexOf('sunrise">')+56);
		//console.log("sunUp: " + sunUp);
		sunDown = tempData.substring(tempData.indexOf('sunset')+50, tempData.indexOf('sunset')+55);
		//console.log("sunDown: " + sunDown);
		moonUp = tempData.substring(tempData.indexOf('moonrise')+52, tempData.indexOf('moonrise')+57);
		//console.log("moonUp: " + moonUp);
		moonDown = tempData.substring(tempData.indexOf('moonset')+51, tempData.indexOf('moonset')+56);
		//console.log("moonDown: " + moonDown);
		/*
		tempData = tempData.substring(tempData.indexOf('Moon Phase'), tempData.indexOf('Moon Phase')+200);
		moonPhase = tempData.substring(tempData.indexOf('<script type="text/javascript'), tempData.indexOf('</script>')+9);
		console.log("moonPhase: " + moonPhase);
		*/
	}

	//Get Tide data
	tideHighLow[0] = new Array();
	tideHighLow[1] = new Array();
	tideHighLow[2] = new Array();
	tideHighLow[3] = new Array();

	if (my_lang == "CHI") {
		tideHighLow[0][0] = currentWxData.substring(currentWxData.indexOf('TideData[0] = ')+37, currentWxData.indexOf('TideData[0] = ')+42);
		tideHighLow[0][1] = currentWxData.substring(currentWxData.indexOf('TideData[0] = ')+46, currentWxData.indexOf('TideData[0] = ')+51);
		
		tideHighLow[1][0] = currentWxData.substring(currentWxData.indexOf('TideData[1] = ')+37, currentWxData.indexOf('TideData[1] = ')+42);
		tideHighLow[1][1] = currentWxData.substring(currentWxData.indexOf('TideData[1] = ')+46, currentWxData.indexOf('TideData[1] = ')+51);
		
		tideHighLow[2][0] = currentWxData.substring(currentWxData.indexOf('TideData[2] = ')+37, currentWxData.indexOf('TideData[2] = ')+42);
		tideHighLow[2][1] = currentWxData.substring(currentWxData.indexOf('TideData[2] = ')+46, currentWxData.indexOf('TideData[2] = ')+51);
		
		tideHighLow[3][0] = currentWxData.substring(currentWxData.indexOf('TideData[3] = ')+37, currentWxData.indexOf('TideData[3] = ')+42);
		tideHighLow[3][1] = currentWxData.substring(currentWxData.indexOf('TideData[3] = ')+46, currentWxData.indexOf('TideData[3] = ')+51);
	} else {
		var temp = currentWxData.substring(currentWxData.indexOf('TideData[0] = '), currentWxData.indexOf('TideData[3] = '));
		tideHighLow[0][0] = temp.substring(temp.indexOf('Low\'')+7, temp.indexOf('Low\'')+12);
		tideHighLow[0][1] = temp.substring(temp.indexOf('Low\'')+16, temp.indexOf('Low\'')+21);
		
		var temp = currentWxData.substring(currentWxData.indexOf('TideData[1] = '), currentWxData.indexOf('TideData[0] = '));
		tideHighLow[1][0] = temp.substring(temp.indexOf('High\'')+8, temp.indexOf('High\'')+13);
		tideHighLow[1][1] = temp.substring(temp.indexOf('High\'')+17, temp.indexOf('High\'')+22);
		
		var temp = currentWxData.substring(currentWxData.indexOf('TideData[2] = '));
		tideHighLow[2][0] = temp.substring(temp.indexOf('Low\'')+7, temp.indexOf('Low\'')+12);
		tideHighLow[2][1] = temp.substring(temp.indexOf('Low\'')+16, temp.indexOf('Low\'')+21);
		
		var temp = currentWxData.substring(currentWxData.indexOf('TideData[3] = '), currentWxData.indexOf('TideData[2] = '));
		tideHighLow[3][0] = temp.substring(temp.indexOf('High\'')+8, temp.indexOf('High\'')+13);
		tideHighLow[3][1] = temp.substring(temp.indexOf('High\'')+17, temp.indexOf('High\'')+22);
	}

	/*
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 2; j++) {
			console.log(tideHighLow[i][j]);
		}
	}
	*/

	/*******************
	* Parsing the 7 days forcast 
	*******************/
	parse_seven_days_info(html);
	/*
	for (var i = 0; i < 7; i++) {
		for (var j = 0; j < 8; j++) {
			console.log(seven_day_array[i][j]);
		}
	}
	*/
	/*******************
	* Setting the title and pictures
	*******************/
	if (my_lang == "CHI") {
		setTitle = "氣溫 : "+currentTemp+"C\n相對濕度 : "+currentRH+"%";
	} else {
		setTitle = "Tempature : "+currentTemp+"C\nRelative Humidity : "+currentRH+"%";
	}
	
	chrome.browserAction.setTitle({title:setTitle});

	if (currentPicture != null){
		chrome.browserAction.setIcon({path:"./images/weather/pic"+currentPicture+".png"});
		iconArray[0] = "./images/weather/pic"+currentPicture+".png";
	}
	if (currentTemp >= 30)
		chrome.browserAction.setBadgeBackgroundColor({color:[250, 0, 0, 200]}); //RGBA
	else if (currentTemp >= 20)
		chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 200]}); 
	else if (currentTemp >= 10)
		chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 200, 200]}); 
	else
		chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 0, 200]});
	chrome.browserAction.setBadgeText({ text:currentTemp+"C" });
}

function parse_local(html) {
	local = html.substring(html.indexOf("<pre>")+5, html.indexOf("</pre>"));
	//console.log(local);
}

function parse_mtsat(html) {
	for(var i = 0; i < 24; i++){
		temp = html.substring(html.indexOf('picture[0]['+i+']'), html.indexOf('picture[0]['+i+']')+80);
		mtsatImg[i] = temp.substring(temp.indexOf('./')+2, temp.indexOf('";'));
		//console.log(i + ' = ' + mtsatImg[i]);
	}
}


function parse_detail(html) {
	detail = null;
	typhoon = false;
	
	//console.log(html);
	if (html.match("font")) {
		var temp = new Array();
		var notification = new Array();
		for (i = 0; i < 21; i++){
			if(my_lang == "CHI") {
				temp[i] = html.substring(html.indexOf("<!--"+warning_ch[i]), html.indexOf("<!--/"+warning_ch[i]));
			} else {
				temp[i] = html.substring(html.indexOf("<!--"+warning[i]), html.indexOf("<!--/"+warning[i]));
			}
			//console.log(temp[i]);
			message[i] = temp[i].substring(temp[i].indexOf("<pre>")+5, temp[i].indexOf("</pre>"));
			//console.log(message[i]);
			if(detail == null){
				detail = message[i];
			} else {
				detail += "<p>"+message[i];
			}

			if(temp[i] == ""){
				warning_appear[i] = false;
			} else {
				if(my_lang == "CHI"){
					if(message[i].match("取 消")){
						warning_appear[i] = false;
						alertDetail[i] = "";
					}else{
						warning_appear[i] = true;
						if(localStorage["notification"] == "on" && alertDetail[i] != message[i]){
							alertDetail[i] = message[i];
							notification[i] = webkitNotifications.createNotification(
									warning_icon[i],  // icon url - can be relative
									warning[i],  // notification title
									message[i]  // notification body text
									);
							notification[i].show();
							if(localStorage["notification_time"] != 0)
								setTimeout(function(){
									for(var j = 0; j < 21; j++){
										if(notification[j] != null)
											notification[j].cancel();							
									}
								}, localStorage["notification_time"]*1000);
						}
						if(i <= 7){
							$.ajax({
								url: typhoon_ch,
								cache: false,
								success: function(html){
									parse_typhoon(html);
								}
							});

							typhoon = true;
						}
					}
				}else{
					if(message[i].match("cancelled")){
						warning_appear[i] = false;
						alertDetail[i] = "";
					}else{
						warning_appear[i] = true;
						if(localStorage["notification"] == "on" && alertDetail[i] != message[i]){
							alertDetail[i] = message[i];
							notification[i] = webkitNotifications.createNotification(
								warning_icon[i],  // icon url - can be relative
								warning[i],  // notification title
								message[i]  // notification body text
								);
							notification[i].show();
							if(localStorage["notification_time"] != 0)
								setTimeout(function(){
									for(var j = 0; j < 21; j++){
										if(notification[j] != null)
											notification[j].cancel();							
									}
								}, localStorage["notification_time"]*1000);
						}
						if(i <= 7){
							$.ajax({
								url: typhoon_en,
								cache: false,
								success: function(html){
									parse_typhoon(html);
								}
							});

							typhoon = true;
						}
					}
				}
			}
		}
		//Handle exception case
		for(i = 0; i < 21; i++){
			
			if(warning_appear[i]) {
				break;
			}
			
			//console.log(html);
			if(i == 20){
				if (my_lang == "CHI") {
					detail = html.substring(html.indexOf("</h1>")+10, html.indexOf("<hr>")-5);
				} else {
					detail = html.substring(html.indexOf("</h1>")+12, html.indexOf("<hr>")-5);
				}
			}
			
		}	
		//console.log(detail)
	} else {
		detail = html.substring(html.indexOf("</h1>")+5, html.indexOf("<hr>"));
		for(i = 0; i < 21; i++) {
			warning_appear[i] = false;
		}
	}				

}

function parse_typhoon(html) {
	if(my_lang == "CHI"){
		typhoonName = html.substring(html.indexOf("<center>")+30, html.indexOf("在香港時間")-14);
		typhoonImg = html.substring(html.indexOf("放 大 的 圖 像")+27, html.indexOf("預 測 的 位 置 和 強 度 ")-23);
		if(typhoonImg.length > 50){
			typhoonImg = html.substring(html.indexOf("./ch_files/tc_"), html.indexOf("./ch_files/tc_")+100);
			typhoonImg = typhoonImg.substring(typhoonImg.indexOf("ch_files/tc_"), typhoonImg.indexOf("alt=")-2);
			if(typhoonImg.length == 0){
				typhoonImg = html.substring(html.indexOf("./ch_files/nwp_"), html.indexOf("./ch_files/nwp_")+100);
				typhoonImg = typhoonImg.substring(typhoonImg.indexOf("ch_files/nwp_"), typhoonImg.indexOf("alt=")-2);
			}
		}
	}else{
		typhoonName = html.substring(html.indexOf("<center>")+30, html.indexOf("<center>")+100);
		typhoonName = typhoonName.substring(0, typhoonName.indexOf("<br>"));
		typhoonImg = html.substring(html.indexOf("zoom_"), html.indexOf("zoom_")+100);
		typhoonImg = typhoonImg.substring(typhoonImg.indexOf("zoom_"), typhoonImg.indexOf("alt=")-6);
		//console.log(typhoonImg);
		if(typhoonImg.length == 0){
			typhoonImg = html.substring(html.indexOf("./en_files/tc_"), html.indexOf("./en_files/tc_")+100);
			typhoonImg = typhoonImg.substring(typhoonImg.indexOf("en_files/tc_"), typhoonImg.indexOf("alt=")-2);
			if(typhoonImg.length == 0){
				typhoonImg = html.substring(html.indexOf("./en_files/nwp_"), html.indexOf("./en_files/nwp_")+100);
				typhoonImg = typhoonImg.substring(typhoonImg.indexOf("en_files/nwp_"), typhoonImg.indexOf("alt=")-2);					
			}
			//console.log(typhoonImg);
		}
	}

}

function parse_seven_days_info(html) {
	var content9 = html.substring(html.indexOf("<!-- Content 9 -->"), html.indexOf("<!-- Content 9 [End]"));
	//console.log(content9);

	for (var i = 0; i < 7; i++) {
		seven_day_array[i] = new Array();
	}


	if (my_lang == "CHI") {
		/***************
		* Date
		****************/
		var Seven_Day_Date = content9.substring(content9.indexOf("Seven_Day_Date")+40, content9.indexOf("Seven_Day_weather_icon"));
		content9 = content9.substring(content9.indexOf("Seven_Day_weather_icon"));
		//console.log(Seven_Day_Date);

		seven_day_array[0][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_1')+25, Seven_Day_Date.indexOf('<br/>'))
		seven_day_array[0][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('<br/>')+5, Seven_Day_Date.indexOf('</th>'))

		Seven_Day_Date = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')+40);
		seven_day_array[1][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_2')+25, Seven_Day_Date.indexOf('<br/>'))
		seven_day_array[1][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('<br/>')+5, Seven_Day_Date.indexOf('</th>'))

		Seven_Day_Date = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')+40);
		seven_day_array[2][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_3')+25, Seven_Day_Date.indexOf('<br/>'))
		seven_day_array[2][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('<br/>')+5, Seven_Day_Date.indexOf('</th>'))

		Seven_Day_Date = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')+40);
		seven_day_array[3][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_4')+25, Seven_Day_Date.indexOf('<br/>'))
		seven_day_array[3][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('<br/>')+5, Seven_Day_Date.indexOf('</th>'))

		Seven_Day_Date = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')+40);
		seven_day_array[4][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_5')+25, Seven_Day_Date.indexOf('<br/>'))
		seven_day_array[4][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('<br/>')+5, Seven_Day_Date.indexOf('</th>'))

		Seven_Day_Date = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')+40);
		seven_day_array[5][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_6')+25, Seven_Day_Date.indexOf('<br/>'))
		seven_day_array[5][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('<br/>')+5, Seven_Day_Date.indexOf('</th>'))

		Seven_Day_Date = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')+40);
		seven_day_array[6][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_7')+25, Seven_Day_Date.indexOf('<br/>'))
		seven_day_array[6][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('<br/>')+5, Seven_Day_Date.indexOf('</th>'))

		var Seven_Day_weather_icon = content9.substring(content9.indexOf("Seven_Day_weather_icon"), content9.indexOf("Seven_Day_Temp"));
		content9 = content9.substring(content9.indexOf("Seven_Day_Temp"));
		//console.log(Seven_Day_weather_icon);


	} else {
		/***************
		* Date
		****************/
		var Seven_Day_Date = content9.substring(content9.indexOf("Seven_Day_Date")+40, content9.indexOf("Seven_Day_weather_icon"));
		content9 = content9.substring(content9.indexOf("Seven_Day_weather_icon"));
		//console.log(Seven_Day_Date);

		seven_day_array[0][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_1')+25, Seven_Day_Date.indexOf('</th>')-3);
		seven_day_array[0][1] =  Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')-3, Seven_Day_Date.indexOf('</th>'));

		Seven_Day_Date = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')+40);
		seven_day_array[1][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_2')+25, Seven_Day_Date.indexOf('</th>')-3);
		seven_day_array[1][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')-3, Seven_Day_Date.indexOf('</th>'));

		Seven_Day_Date = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')+40);
		seven_day_array[2][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_3')+25, Seven_Day_Date.indexOf('</th>')-3);
		seven_day_array[2][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')-3, Seven_Day_Date.indexOf('</th>'));

		Seven_Day_Date = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')+40);
		seven_day_array[3][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_4')+25, Seven_Day_Date.indexOf('</th>')-3);
		seven_day_array[3][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')-3, Seven_Day_Date.indexOf('</th>'));

		Seven_Day_Date = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')+40);
		seven_day_array[4][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_5')+25, Seven_Day_Date.indexOf('</th>')-3);
		seven_day_array[4][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')-3, Seven_Day_Date.indexOf('</th>'));

		Seven_Day_Date = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')+40);
		seven_day_array[5][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_6')+25, Seven_Day_Date.indexOf('</th>')-3);
		seven_day_array[5][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')-3, Seven_Day_Date.indexOf('</th>'));

		Seven_Day_Date = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')+40);
		seven_day_array[6][0] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('Seven_Day_7')+25, Seven_Day_Date.indexOf('</th>')-3);
		seven_day_array[6][1] = Seven_Day_Date.substring(Seven_Day_Date.indexOf('</th>')-3, Seven_Day_Date.indexOf('</th>'));

		var Seven_Day_weather_icon = content9.substring(content9.indexOf("Seven_Day_weather_icon"), content9.indexOf("Seven_Day_Temp"));
		content9 = content9.substring(content9.indexOf("Seven_Day_Temp"));
		//console.log(Seven_Day_weather_icon);
	}
	/***************
	* Weather Icon
	****************/
	var temp = "";
	
	temp = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf("<td>"), Seven_Day_weather_icon.indexOf("</td>"));
	seven_day_array[0][2] = temp.substring(temp.indexOf("images/wxicon/")+14, temp.indexOf('" alt'));
	seven_day_array[0][3] = temp.substring(temp.indexOf('" alt')+7, temp.indexOf('" width'));

	Seven_Day_weather_icon = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf('Seven_Day_2'));
	temp = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf("<td>"), Seven_Day_weather_icon.indexOf("</td>"));
	seven_day_array[1][2] = temp.substring(temp.indexOf("images/wxicon/")+14, temp.indexOf('" alt'));
	seven_day_array[1][3] = temp.substring(temp.indexOf('" alt')+7, temp.indexOf('" width'));

	Seven_Day_weather_icon = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf('Seven_Day_3'));
	temp = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf("<td>"), Seven_Day_weather_icon.indexOf("</td>"));
	seven_day_array[2][2] = temp.substring(temp.indexOf("images/wxicon/")+14, temp.indexOf('" alt'));
	seven_day_array[2][3] = temp.substring(temp.indexOf('" alt')+7, temp.indexOf('" width'));

	Seven_Day_weather_icon = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf('Seven_Day_4'));
	temp = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf("<td>"), Seven_Day_weather_icon.indexOf("</td>"));
	seven_day_array[3][2] = temp.substring(temp.indexOf("images/wxicon/")+14, temp.indexOf('" alt'));
	seven_day_array[3][3] = temp.substring(temp.indexOf('" alt')+7, temp.indexOf('" width'));

	Seven_Day_weather_icon = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf('Seven_Day_5'));
	temp = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf("<td>"), Seven_Day_weather_icon.indexOf("</td>"));
	seven_day_array[4][2] = temp.substring(temp.indexOf("images/wxicon/")+14, temp.indexOf('" alt'));
	seven_day_array[4][3] = temp.substring(temp.indexOf('" alt')+7, temp.indexOf('" width'));

	Seven_Day_weather_icon = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf('Seven_Day_6'));
	temp = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf("<td>"), Seven_Day_weather_icon.indexOf("</td>"));
	seven_day_array[5][2] = temp.substring(temp.indexOf("images/wxicon/")+14, temp.indexOf('" alt'));
	seven_day_array[5][3] = temp.substring(temp.indexOf('" alt')+7, temp.indexOf('" width'));

	Seven_Day_weather_icon = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf('Seven_Day_7'));
	temp = Seven_Day_weather_icon.substring(Seven_Day_weather_icon.indexOf("<td>"), Seven_Day_weather_icon.indexOf("</td>"));
	seven_day_array[6][2] = temp.substring(temp.indexOf("images/wxicon/")+14, temp.indexOf('" alt'));
	seven_day_array[6][3] = temp.substring(temp.indexOf('" alt')+7, temp.indexOf('" width'));
	

	/***************
	* Tempature
	****************/
	var Seven_Day_Temp = content9.substring(content9.indexOf("Seven_Day_Temp"), content9.indexOf("Seven_Day_RH"));
	//console.log(Seven_Day_Temp);

	temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf("<td>"), Seven_Day_Temp.indexOf("</td>"));
	seven_day_array[0][4] = temp.substring(temp.indexOf("blue")+7, temp.indexOf('</span>'));
	seven_day_array[0][5] = temp.substring(temp.indexOf('#C40000')+10, temp.indexOf('<sup>')-8);

	Seven_Day_Temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf('Seven_Day_2'));
	temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf("<td>"), Seven_Day_Temp.indexOf("</td>"));
	seven_day_array[1][4] = temp.substring(temp.indexOf("blue")+7, temp.indexOf('</span>'));
	seven_day_array[1][5] = temp.substring(temp.indexOf('#C40000')+10, temp.indexOf('<sup>')-8);

	Seven_Day_Temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf('Seven_Day_3'));
	temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf("<td>"), Seven_Day_Temp.indexOf("</td>"));
	seven_day_array[2][4] = temp.substring(temp.indexOf("blue")+7, temp.indexOf('</span>'));
	seven_day_array[2][5] = temp.substring(temp.indexOf('#C40000')+10, temp.indexOf('<sup>')-8);

	Seven_Day_Temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf('Seven_Day_4'));
	temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf("<td>"), Seven_Day_Temp.indexOf("</td>"));
	seven_day_array[3][4] = temp.substring(temp.indexOf("blue")+7, temp.indexOf('</span>'));
	seven_day_array[3][5] = temp.substring(temp.indexOf('#C40000')+10, temp.indexOf('<sup>')-8);

	Seven_Day_Temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf('Seven_Day_5'));
	temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf("<td>"), Seven_Day_Temp.indexOf("</td>"));
	seven_day_array[4][4] = temp.substring(temp.indexOf("blue")+7, temp.indexOf('</span>'));
	seven_day_array[4][5] = temp.substring(temp.indexOf('#C40000')+10, temp.indexOf('<sup>')-8);

	Seven_Day_Temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf('Seven_Day_6'));
	temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf("<td>"), Seven_Day_Temp.indexOf("</td>"));
	seven_day_array[5][4] = temp.substring(temp.indexOf("blue")+7, temp.indexOf('</span>'));
	seven_day_array[5][5] = temp.substring(temp.indexOf('#C40000')+10, temp.indexOf('<sup>')-8);

	Seven_Day_Temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf('Seven_Day_7'));
	temp = Seven_Day_Temp.substring(Seven_Day_Temp.indexOf("<td>"), Seven_Day_Temp.indexOf("</td>"));
	seven_day_array[6][4] = temp.substring(temp.indexOf("blue")+7, temp.indexOf('</span>'));
	seven_day_array[6][5] = temp.substring(temp.indexOf('#C40000')+10, temp.indexOf('<sup>')-8);


	/***************
	* RH
	****************/
	Seven_Day_RH = content9.substring(content9.indexOf("Seven_Day_RH"));
	//console.log(Seven_Day_RH);
	temp = Seven_Day_RH.substring(Seven_Day_RH.indexOf("<td "), Seven_Day_RH.indexOf("</td>"));
	seven_day_array[0][6] = temp.substring(temp.indexOf("blue")+7, temp.indexOf('</span>'));
	seven_day_array[0][7] = temp.substring(temp.indexOf('#C40000')+10, temp.indexOf('</span> %'));

	Seven_Day_RH = Seven_Day_RH.substring(Seven_Day_RH.indexOf('</td>')+20);
	seven_day_array[1][6] = Seven_Day_RH.substring(Seven_Day_RH.indexOf("blue")+7, Seven_Day_RH.indexOf('</span>'));
	seven_day_array[1][7] = Seven_Day_RH.substring(Seven_Day_RH.indexOf('#C40000')+10, Seven_Day_RH.indexOf('</span> %'));

	Seven_Day_RH = Seven_Day_RH.substring(Seven_Day_RH.indexOf('</td>')+20);
	seven_day_array[2][6] = Seven_Day_RH.substring(Seven_Day_RH.indexOf("blue")+7, Seven_Day_RH.indexOf('</span>'));
	seven_day_array[2][7] = Seven_Day_RH.substring(Seven_Day_RH.indexOf('#C40000')+10, Seven_Day_RH.indexOf('</span> %'));

	Seven_Day_RH = Seven_Day_RH.substring(Seven_Day_RH.indexOf('</td>')+20);
	seven_day_array[3][6] = Seven_Day_RH.substring(Seven_Day_RH.indexOf("blue")+7, Seven_Day_RH.indexOf('</span>'));
	seven_day_array[3][7] = Seven_Day_RH.substring(Seven_Day_RH.indexOf('#C40000')+10, Seven_Day_RH.indexOf('</span> %'));

	Seven_Day_RH = Seven_Day_RH.substring(Seven_Day_RH.indexOf('</td>')+20);
	seven_day_array[4][6] = Seven_Day_RH.substring(Seven_Day_RH.indexOf("blue")+7, Seven_Day_RH.indexOf('</span>'));
	seven_day_array[4][7] = Seven_Day_RH.substring(Seven_Day_RH.indexOf('#C40000')+10, Seven_Day_RH.indexOf('</span> %'));

	Seven_Day_RH = Seven_Day_RH.substring(Seven_Day_RH.indexOf('</td>')+20);
	seven_day_array[5][6] = Seven_Day_RH.substring(Seven_Day_RH.indexOf("blue")+7, Seven_Day_RH.indexOf('</span>'));
	seven_day_array[5][7] = Seven_Day_RH.substring(Seven_Day_RH.indexOf('#C40000')+10, Seven_Day_RH.indexOf('</span> %'));

	Seven_Day_RH = Seven_Day_RH.substring(Seven_Day_RH.indexOf('</td>')+20);
	seven_day_array[6][6] = Seven_Day_RH.substring(Seven_Day_RH.indexOf("blue")+7, Seven_Day_RH.indexOf('</span>'));
	seven_day_array[6][7] = Seven_Day_RH.substring(Seven_Day_RH.indexOf('#C40000')+10, Seven_Day_RH.indexOf('</span> %'));
}

function parse_air(html) {
	var content = html.substring(html.indexOf("<!-- BEGIN CONTENT -->"), html.indexOf("<!-- END CONTENT -->"));
	
	air_title = content.substring(content.indexOf("<b>")+3, content.indexOf("</b>"));
	
	air_station[0] = new Array();
	air_station[1] = new Array();
	
	content = content.substring(content.indexOf("</font>")+10);
	air_station[0][0] = content.substring(content.indexOf('size="2"')+9, content.indexOf('</font>'));

	content = content.substring(content.indexOf("</font>")+10);
	air_station[0][1] = content.substring(content.indexOf('size="2"')+9, content.indexOf('</font>'));

	content = content.substring(content.indexOf("</font>")+10);
	air_station[1][0] = content.substring(content.indexOf('size="2"')+9, content.indexOf('</font>'));

	content = content.substring(content.indexOf("</font>")+10);
	air_station[1][1] = content.substring(content.indexOf('size="2"')+9, content.indexOf('</font>'));

	//console.log(air_station[0][0] + air_station[0][1] + air_station[1][0] + air_station[1][1]);
}
