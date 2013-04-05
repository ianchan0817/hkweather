var bgPage = chrome.extension.getBackgroundPage();
var my_lang = localStorage["language"];

//Set the JQuery UI Theme
$(function() {
	var theme = localStorage["theme"];
	$('head').append('<link type="text/css" href="./css/'+theme+'/jquery-ui-1.9.2.custom.css" rel="stylesheet" />');
});


//Set GA
function trackButton(selector) {
	_gaq.push(['_trackEvent', selector, 'clicked']);	//Event 
}


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36634197-1']);
_gaq.push(['_trackPageview']);							//Page View
_gaq.push(['_trackEvent', localStorage["notification"], localStorage["theme"], my_lang]);
	

$(function() {
 	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  	ga.src = 'https://ssl.google-analytics.com/ga.js';
  	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
});


//Init
$(function() {
	$( "#accordion" ).accordion({
		event: "click hoverintent",
		collapsible: true
	});

	$( "#accordion" ).accordion( "option", "icons", null );

	$( ".tabs" ).tabs({
		event: "mouseover",
		activate: function( event, ui ) {
			trackButton(ui.newPanel.selector);
		}
	});

	$("div").css("padding","0px");
	$(".tab").css({
   		'padding': '10px'
	});
	trackButton("#tabs-0");
});

$(document).ready(function() {
	bgPage.init();
	var date = bgPage.getDate(); 
	var time = bgPage.getCurrentTime();
	var temp = bgPage.getCurrentTemp();
	var rh = bgPage.getCurrentRH();
	var uvi  = bgPage.getCurrentUVI();	
	var intensity = bgPage.getCurrentIntensity();
	var seaTemp = bgPage.getCurrentSeaTemp();

	if (my_lang == "ENG") {
		$("#panel0").html("Overview");
		$("#tab0").html("Weather");
		$("#tab1").html("7 Days Forecast");
		$("#tab2").html("Air Pollution Index");
		
		$("#panel1").html("Districts");
		$("#tab1-0").html("Temp");
		$("#tab1-1").html("RH");
		$("#tab1-2").html("Max Temp");
		$("#tab1-3").html("Min Temp");
		$("#tab1-4").html("Wind");
		$("#tab1-5").html("Visibility");
		$("#tab1-6").html("RF");

		$("#panel2").html("More Information");
		$("#tab2-0").html("Warning");
		$("#tab2-1").html("Tropical Cyclone");
		$("#tab2-2").html("UV");
		$("#tab2-3").html("History");
		$("#tab2-4").html("Satellite");
		$("#tab2-5").html("Tide and Astron");


		temp_label = 'Temp';
		rh_label = 'RH';
		time_label= 'Updated';
		uvi_label = 'UVI';
		seaTemp_label = 'North Point Sea Surface Temp';
		moonPhase_label = 'Moon phase';
		icon_map = bgPage.mapping_en(bgPage.getCurrentPicture());
		forcast_label = 'Local Weather Forecast';


		/******************
		* 7 Days Forcasts
		******************/
		var sever_days_info = '<table id="sever_days_info"><tr class="ui-widget-header"><td>'+bgPage.getSeven_day_array(0,0)+'</td><td>'+bgPage.getSeven_day_array(1,0)+'</td><td>'+bgPage.getSeven_day_array(2,0)+'</td><td>'+bgPage.getSeven_day_array(3,0)+'</td><td>'+bgPage.getSeven_day_array(4,0)+'</td><td>'+bgPage.getSeven_day_array(5,0)+'</td><td>'+bgPage.getSeven_day_array(6,0)+'</td></tr>';

		sever_days_info += '<tr class="ui-widget-header"><td>' +bgPage.getSeven_day_array(0,1)+'</td><td>'+bgPage.getSeven_day_array(1,1)+'</td><td>'+bgPage.getSeven_day_array(2,1)+'</td><td>'+bgPage.getSeven_day_array(3,1)+'</td><td>'+bgPage.getSeven_day_array(4,1)+'</td><td>'+bgPage.getSeven_day_array(5,1)+'</td><td>'+bgPage.getSeven_day_array(6,1)+'</td></tr>';

		sever_days_info += '<tr class="ui-widget-content"><td><img src="images/weather/' +bgPage.getSeven_day_array(0,2)+'"></td><td><img src="images/weather/'+bgPage.getSeven_day_array(1,2)+'"></td><td><img src="images/weather/'+bgPage.getSeven_day_array(2,2)+'"></td><td><img src="images/weather/'+bgPage.getSeven_day_array(3,2)+'"></td><td><img src="images/weather/'+bgPage.getSeven_day_array(4,2)+'"></td><td><img src="images/weather/'+bgPage.getSeven_day_array(5,2)+'"></td><td><img src="images/weather/'+bgPage.getSeven_day_array(6,2)+'"></td></tr>';

		sever_days_info += '<tr class="ui-widget-content"><td>' +bgPage.getSeven_day_array(0,4)+'-'+bgPage.getSeven_day_array(0,5)+unescape("%u2103")+'</td><td>'+bgPage.getSeven_day_array(1,4)+'-'+bgPage.getSeven_day_array(1,5)+unescape("%u2103")+'</td><td>'+bgPage.getSeven_day_array(2,4)+'-'+bgPage.getSeven_day_array(2,5)+unescape("%u2103")+'</td><td>'+bgPage.getSeven_day_array(3,4)+'-'+bgPage.getSeven_day_array(3,5)+unescape("%u2103")+'</td><td>'+bgPage.getSeven_day_array(4,4)+'-'+bgPage.getSeven_day_array(4,5)+unescape("%u2103")+'</td><td>'+bgPage.getSeven_day_array(5,4)+'-'+bgPage.getSeven_day_array(5,5)+unescape("%u2103")+'</td><td>'+bgPage.getSeven_day_array(6,4)+'-'+bgPage.getSeven_day_array(6,5)+unescape("%u2103")+'</td></tr>';

		sever_days_info += '<tr class="ui-widget-content"><td>' +bgPage.getSeven_day_array(0,6)+'-'+bgPage.getSeven_day_array(0,7)+'%</td><td>'+bgPage.getSeven_day_array(1,6)+'-'+bgPage.getSeven_day_array(1,7)+'%</td><td>'+bgPage.getSeven_day_array(2,6)+'-'+bgPage.getSeven_day_array(2,7)+'%</td><td>'+bgPage.getSeven_day_array(3,6)+'-'+bgPage.getSeven_day_array(3,7)+'%</td><td>'+bgPage.getSeven_day_array(4,6)+'-'+bgPage.getSeven_day_array(4,7)+'%</td><td>'+bgPage.getSeven_day_array(5,6)+'-'+bgPage.getSeven_day_array(5,7)+'%</td><td>'+bgPage.getSeven_day_array(6,6)+'-'+bgPage.getSeven_day_array(6,7)+'%</td></tr>';

		sever_days_info += '<tr class="ui-widget-content left font12"><td>' +bgPage.getSeven_day_array(0,3)+'</td><td>'+bgPage.getSeven_day_array(1,3)+'</td><td>'+bgPage.getSeven_day_array(2,3)+'</td><td>'+bgPage.getSeven_day_array(3,3)+'</td><td>'+bgPage.getSeven_day_array(4,3)+'</td><td>'+bgPage.getSeven_day_array(5,3)+'</td><td>'+bgPage.getSeven_day_array(6,3)+'</td></tr>';
 

		sever_days_info += '</table>';


		$("#tabs-1").html(sever_days_info);


		/******************
		* More Information 
		******************/
		$("#tabs1-0").html('<img src="http://www.weather.gov.hk/content_elements/regionwx0e.png" width="400px"  />');	
		$("#tabs1-1").html('<img src="http://www.weather.gov.hk/content_elements/regionwx1e.png" width="400px"  />');	
		$("#tabs1-2").html('<img src="http://www.weather.gov.hk/content_elements/regionwx2e.png" width="400px"  />');	
		$("#tabs1-3").html('<img src="http://www.weather.gov.hk/content_elements/regionwx3e.png" width="400px"  />');	
		$("#tabs1-4").html('<img src="http://www.weather.gov.hk/content_elements/regionwx4e.png" width="400px"  />');	
		$("#tabs1-5").html('<img src="http://www.weather.gov.hk/content_elements/regionwx5e.png" width="400px"  />');	
		$("#tabs1-6").html('<img src="http://www.weather.gov.hk/content_elements/regionwx6e.png" width="400px"  />');	

		/******************
		* Typhoon
		******************/
		if (bgPage.checkTyphoon()) {
			$("#tabs2-1").html(bgPage.getName());	
		} else {
			$("#tabs2-1").html('There is no tropical cyclone information.');	
		}

		/******************
		* Tide and Astron
		******************/
		var tide_astron = '<table id="tide_astron"><tr class="ui-widget-header"><td>Sunrise</td><td>Sunset</td><td>Moonrise</td><td>Moonset</td></tr>';
		tide_astron += '<tr class="ui-widget-content"><td>' + bgPage.getSunUp() + '</td><td>' + bgPage.getSunDown() + '</td><td>' + bgPage.getMoonUp() + '</td><td>' + bgPage.getMoonDown() + '</td></tr>';
		tide_astron += '<tr class="ui-widget-header"><td>Low Tide</td><td>High Tide</td><td>Low Tide</td><td>High Tide</td></tr>';
		tide_astron += '<tr class="ui-widget-content"><td>' + bgPage.getTideHighLow(0,0) + '</td><td>' + bgPage.getTideHighLow(1,0) + '</td><td>' + bgPage.getTideHighLow(2,0) + '</td><td>' + bgPage.getTideHighLow(3,0) + '</td></tr>';
		tide_astron += '<tr class="ui-widget-content"><td>' + bgPage.getTideHighLow(0,1) + '</td><td>' + bgPage.getTideHighLow(1,1) + '</td><td>' + bgPage.getTideHighLow(2,1) + '</td><td>' + bgPage.getTideHighLow(3,1) + '</td></tr>';
		tide_astron += "</table>";
		$("#tabs2-5").html(tide_astron);
		

	} else {
		$("#panel0").html("概覽");
		$("#tab0").html("現時天氣");
		$("#tab1").html("七天天氣預報");
		$("#tab2").html("空氣污染指數");

		$("#panel1").html("分區天氣");
		$("#tab1-0").html("溫度");
		$("#tab1-1").html("相對濕度");
		$("#tab1-2").html("最高溫度");
		$("#tab1-3").html("最低溫度");
		$("#tab1-4").html("風");
		$("#tab1-5").html("能見度");
		$("#tab1-6").html("雨量");

		$("#panel2").html("更多資訊");
		$("#tab2-0").html("警告詳細資料");
		$("#tab2-1").html("熱帶氣旋資料");
		$("#tab2-2").html("紫外線");
		$("#tab2-3").html("天氣紀錄");
		$("#tab2-4").html("衛星圖");
		$("#tab2-5").html("天文與潮夕");

		temp_label = '現時溫度';
		rh_label = '現時濕度';
		time_label= '更新時間';
		uvi_label = '紫外線';
		seaTemp_label = '北角海水溫度';
		moonPhase_label = '月相';
		icon_map = bgPage.mapping_ch(bgPage.getCurrentPicture());
		forcast_label = '本港地區天氣預報';



		/******************
		* 7 Days Forcasts
		******************/
		var sever_days_info = '<table id="sever_days_info"><tr class="ui-widget-header"><td>'+bgPage.getSeven_day_array(0,0)+'</td><td>'+bgPage.getSeven_day_array(1,0)+'</td><td>'+bgPage.getSeven_day_array(2,0)+'</td><td>'+bgPage.getSeven_day_array(3,0)+'</td><td>'+bgPage.getSeven_day_array(4,0)+'</td><td>'+bgPage.getSeven_day_array(5,0)+'</td><td>'+bgPage.getSeven_day_array(6,0)+'</td></tr>';

		sever_days_info += '<tr class="ui-widget-header"><td>' +bgPage.getSeven_day_array(0,1)+'</td><td>'+bgPage.getSeven_day_array(1,1)+'</td><td>'+bgPage.getSeven_day_array(2,1)+'</td><td>'+bgPage.getSeven_day_array(3,1)+'</td><td>'+bgPage.getSeven_day_array(4,1)+'</td><td>'+bgPage.getSeven_day_array(5,1)+'</td><td>'+bgPage.getSeven_day_array(6,1)+'</td></tr>';

		sever_days_info += '<tr class="ui-widget-content"><td><img src="images/weather/' +bgPage.getSeven_day_array(0,2)+'"></td><td><img src="images/weather/'+bgPage.getSeven_day_array(1,2)+'"></td><td><img src="images/weather/'+bgPage.getSeven_day_array(2,2)+'"></td><td><img src="images/weather/'+bgPage.getSeven_day_array(3,2)+'"></td><td><img src="images/weather/'+bgPage.getSeven_day_array(4,2)+'"></td><td><img src="images/weather/'+bgPage.getSeven_day_array(5,2)+'"></td><td><img src="images/weather/'+bgPage.getSeven_day_array(6,2)+'"></td></tr>';

		sever_days_info += '<tr class="ui-widget-content"><td>' +bgPage.getSeven_day_array(0,4)+'-'+bgPage.getSeven_day_array(0,5)+unescape("%u2103")+'</td><td>'+bgPage.getSeven_day_array(1,4)+'-'+bgPage.getSeven_day_array(1,5)+unescape("%u2103")+'</td><td>'+bgPage.getSeven_day_array(2,4)+'-'+bgPage.getSeven_day_array(2,5)+unescape("%u2103")+'</td><td>'+bgPage.getSeven_day_array(3,4)+'-'+bgPage.getSeven_day_array(3,5)+unescape("%u2103")+'</td><td>'+bgPage.getSeven_day_array(4,4)+'-'+bgPage.getSeven_day_array(4,5)+unescape("%u2103")+'</td><td>'+bgPage.getSeven_day_array(5,4)+'-'+bgPage.getSeven_day_array(5,5)+unescape("%u2103")+'</td><td>'+bgPage.getSeven_day_array(6,4)+'-'+bgPage.getSeven_day_array(6,5)+unescape("%u2103")+'</td></tr>';

		sever_days_info += '<tr class="ui-widget-content"><td>' +bgPage.getSeven_day_array(0,6)+'-'+bgPage.getSeven_day_array(0,7)+'%</td><td>'+bgPage.getSeven_day_array(1,6)+'-'+bgPage.getSeven_day_array(1,7)+'%</td><td>'+bgPage.getSeven_day_array(2,6)+'-'+bgPage.getSeven_day_array(2,7)+'%</td><td>'+bgPage.getSeven_day_array(3,6)+'-'+bgPage.getSeven_day_array(3,7)+'%</td><td>'+bgPage.getSeven_day_array(4,6)+'-'+bgPage.getSeven_day_array(4,7)+'%</td><td>'+bgPage.getSeven_day_array(5,6)+'-'+bgPage.getSeven_day_array(5,7)+'%</td><td>'+bgPage.getSeven_day_array(6,6)+'-'+bgPage.getSeven_day_array(6,7)+'%</td></tr>';

		sever_days_info += '<tr class="ui-widget-content left font12"><td>' +bgPage.getSeven_day_array(0,3)+'</td><td>'+bgPage.getSeven_day_array(1,3)+'</td><td>'+bgPage.getSeven_day_array(2,3)+'</td><td>'+bgPage.getSeven_day_array(3,3)+'</td><td>'+bgPage.getSeven_day_array(4,3)+'</td><td>'+bgPage.getSeven_day_array(5,3)+'</td><td>'+bgPage.getSeven_day_array(6,3)+'</td></tr>';
 

		sever_days_info += '</table>';


		$("#tabs-1").html(sever_days_info);


		/******************
		* More Information 
		******************/
		$("#tabs1-0").html('<img src="http://www.weather.gov.hk/content_elements/regionwx0c.png" width="400px"  />');
		$("#tabs1-1").html('<img src="http://www.weather.gov.hk/content_elements/regionwx1c.png" width="400px"  />');	
		$("#tabs1-2").html('<img src="http://www.weather.gov.hk/content_elements/regionwx2c.png" width="400px"  />');	
		$("#tabs1-3").html('<img src="http://www.weather.gov.hk/content_elements/regionwx3c.png" width="400px"  />');	
		$("#tabs1-4").html('<img src="http://www.weather.gov.hk/content_elements/regionwx4c.png" width="400px"  />');	
		$("#tabs1-5").html('<img src="http://www.weather.gov.hk/content_elements/regionwx5c.png" width="400px"  />');	
		$("#tabs1-6").html('<img src="http://www.weather.gov.hk/content_elements/regionwx6c.png" width="400px"  />');


		/******************
		* Typhoon
		******************/
		if (bgPage.checkTyphoon()) {
			$("#tabs2-1").html(bgPage.getName());	
		} else {
			$("#tabs2-1").html('現時沒有熱帶氣旋資料');	
		}

		/******************
		* Tide and Astron
		******************/
		var tide_astron = '<table id="tide_astron"><tr class="ui-widget-header"><td>日出</td><td>日落</td><td>月出</td><td>月落</td></tr>';
		tide_astron += '<tr class="ui-widget-content"><td>' + bgPage.getSunUp() + '</td><td>' + bgPage.getSunDown() + '</td><td>' + bgPage.getMoonUp() + '</td><td>' + bgPage.getMoonDown() + '</td></tr>';
		tide_astron += '<tr class="ui-widget-header"><td>退潮</td><td>漲潮</td><td>退潮</td><td>漲潮</td></tr>';
		tide_astron += '<tr class="ui-widget-content"><td>' + bgPage.getTideHighLow(0,0) + '</td><td>' + bgPage.getTideHighLow(1,0) + '</td><td>' + bgPage.getTideHighLow(2,0) + '</td><td>' + bgPage.getTideHighLow(3,0) + '</td></tr>';
		tide_astron += '<tr class="ui-widget-content"><td>' + bgPage.getTideHighLow(0,1) + '</td><td>' + bgPage.getTideHighLow(1,1) + '</td><td>' + bgPage.getTideHighLow(2,1) + '</td><td>' + bgPage.getTideHighLow(3,1) + '</td></tr>';
		tide_astron += "</table>";
		$("#tabs2-5").html(tide_astron);
		
	}

	/******************
	* Current Weather 
	******************/
	//Date
	var current_info = '<div id="date" class="font_info ui-widget ui-widget-header ui-corner-all">'+date+'</div>'; 

	//Current Info
	current_info += '<table id="current_info"><tr>';
	current_info += '<td width="240px"><img width="50px" src="images/weather/pic'+bgPage.getCurrentPicture()+'.png"><div class="midnightBlue font34">'+icon_map+'</div></td>';
	current_info += '<td width="400px" align="left">';
	current_info += '<span id="temp" class="font22">'+temp_label+': <span class="red font22 bold">'+temp+unescape("%u2103")+'</span></span>&nbsp;&nbsp;';
	current_info += '<span id="hr" class="font22">'+rh_label+': <span class="orange font22 bold">'+rh+'%</span></span>';
	current_info += '<hr><div id="time" class="left font16">'+time_label+': <span class="blue font16 bold">'+time+'</span></div>';
	if (uvi != "" && intensity != "" ) {
		current_info += '<div id="uvi" class="left font16">'+uvi_label+': <span class="green font16 bold">'+uvi+'('+intensity+')'+'</span></div>';	
	}
	current_info += '<div id="seaTemp" class="left font16">'+seaTemp_label+': <span class="purple font16 bold">'+seaTemp+unescape("%u2103")+'</span></div></td>';
	current_info += '<td width="200px">'+moonPhase()+'<br />'+moonPhase_label+'</td>';
	current_info += '</tr>';


	//Current Warngings
	current_info += '<tr><td colspan="3" class="left"><div id="warngings" class="left">';
	for(i = 0; i < 21; i++){
		if(bgPage.checkWarning(i)){
			current_info += '<img src="'+bgPage.getWarningIcon(i)+'"></img>&nbsp;&nbsp;&nbsp;';
		}
	}
	current_info += '</div></td></tr>';

	//More description
	current_info += '<tr><td colspan="3" class="font14 left">'+forcast_label+'<hr>'+bgPage.getLocal()+'</td></tr>';		

	current_info += '</table>';

	$("#tabs-0").html(current_info);

	/******************
	* Air Pollution Index 
	******************/	
	var api = '<table id="api"><tr><td class="ui-widget-header" colspan="2">'+bgPage.getAirTitle()+'</td></tr>';
	api += '<tr><td>'+bgPage.getAirStation(0,0)+'</td><td>'+bgPage.getAirStation(0,1)+'</td></tr>';
	api += '<tr><td>'+bgPage.getAirStation(1,0)+'</td><td>'+bgPage.getAirStation(1,1)+'</td></tr>';
	api += '</table>';
	$("#tabs-2").html(api);


	/******************
	* Warning Details
	******************/
	$("#tabs2-0").html(bgPage.getDetail());
	
	
	/******************
	* UV Index 
	******************/
	$("#tabs2-2").html('<img src="http://www.hko.gov.hk/wxinfo/uvindex/today.png" width="330px"  />');	


	/******************
	* History of Tempature 
	******************/
	$("#tabs2-3").html('<img src="http://www.hko.gov.hk/wxinfo/ts/temp/hkotemp.png" width="700px"  /> ');


	/******************
	* mtSat
	******************/
	var mtsat_img = "http://www.weather.gov.hk/wxinfo/intersat/mtsat/" + bgPage.getMtsat(0);
	var mtsat = '<div id="slider-range-min"></div><br /><img src="'+ mtsat_img + '"width="400px"  id="mtsatImg"/>';
	var mtsat_int = 0;
	$("#tabs2-4").html(mtsat);
	$( "#slider-range-min" ).slider({
		range: "min",
		value: mtsat_int,
		min: 0,
		max: 23,
		slide: function( event, ui ) {
			mtsat_int = ui.value;
			var img = "http://www.weather.gov.hk/wxinfo/intersat/mtsat/" + bgPage.getMtsat(ui.value);
			$("#mtsatImg").attr("src",img);
		},
		change: function( event, ui ) {
			mtsat_int = ui.value;
			var img = "http://www.weather.gov.hk/wxinfo/intersat/mtsat/" + bgPage.getMtsat(ui.value);
			$("#mtsatImg").attr("src",img);
		}
	});

	
	setInterval(function() {
		if (mtsat_int == 23) {
			mtsat_int = 0;
		} else {
			mtsat_int++;
		}
	    $("#slider-range-min").slider('value',mtsat_int);
	}, 2000);
});





/******************
* Moon Phase function from HKO
******************/
function moonPhase() {
	// Date0 is the number of millisecond between 1-JAN-1970 00:00:00 UTC and the first millisecond(UTC) in the current year
var Date0=1325376000000; // at 2012-01-01 08:00:00 HKT

// 18 cycles for the Moon phase
var NewPhase=new Array(1928340,4487700,7051020,9616680,12181620,14742120,17295840,19842840,22385460,24926520,27468480,30012120,32557440,35104800,37655460,40210500,42769680,45330960);
var FirstPhase=new Array(2607000,5188860,7760460,10317420,12860160,15391800,17916960,20440440,22966860,25500720,28045860,30604740,33176700,35757060,38338020,40912260,43475700,46027440);
var FullPhase=new Array(3275640,5823540,8363940,10899300,13432320,15965520,18502020,21045480,23599140,26164140,28737960,31314060,33885480,36447960,39000420,41543820,44079900,46611120);
var LastPhase=new Array(3863040,6398700,8938200,11483220,14035260,16595280,19162500,21734100,24305580,26872560,29431860,31982280,34523760,37057980,39587820,42117240,44650680,47192040);
 
var d1 = new Date();
var Now=(d1.getTime()-Date0)/1000;
 
i=0;
 
while (i<18)
{ if ((NewPhase[i]<=Now)&&(Now<NewPhase[i+1]))
  { MoonAge=(Now-NewPhase[i])/3600/24;
    if (LastPhase[i]<Now)
    { ph=3;
      pt=parseInt((Now-LastPhase[i])/((NewPhase[i+1]-LastPhase[i])/8)+0.5);
    }
    else if (FullPhase[i]<Now)
    { ph=2;
      pt=parseInt((Now-FullPhase[i])/((LastPhase[i]-FullPhase[i])/8)+0.5);
    }
    else if (FirstPhase[i]<Now)
    { ph=1;
      pt=parseInt((Now-FirstPhase[i])/((FullPhase[i]-FirstPhase[i])/8)+0.5);
    }
    else
    { ph=0;
      pt=parseInt((Now-NewPhase[i])/((FirstPhase[i]-NewPhase[i])/8)+0.5);
    }
    if (pt==8)
    { ph=(ph+1)%4;
      pt=0;
    }
    num=i;
    i=17;
  }
  i++;
}
 
AgeDay=parseInt(MoonAge);
AgeHour=(MoonAge-AgeDay)*24;
AltC="_" + AgeDay + "_" + AgeHour.toFixed(1) + "_";
 
return "<IMG width=\"50px\" SRC=\"images/moon/MOON" + ph + "0" + pt + ".jpg\" ALT=\"" + AltC + "\" TITLE=\"" + AltC + "\">";

}


