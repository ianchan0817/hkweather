function mapping_ch(icon){
	var temp = "";
	if(icon == 50){
		temp = "陽光充沛";
	}
	else if(icon == 51){
		temp = "間有陽光";
	}
	else if(icon == 52){
		temp = "短暫陽光";	
	}
	else if(icon == 53){
		temp = "間有陽光幾陣驟雨";
	}
	else if(icon == 54){
		temp = "短暫陽光有驟雨";
	}
	else if(icon == 60){
		temp = "多雲";
	}
	else if(icon == 61){
		temp = "密雲";
	}
	else if(icon == 62){
		temp = "微雨";
	}
	else if(icon == 63){
		temp = "雨";
	}
	else if(icon == 64){
		temp = "大雨";
	}
	else if(icon == 65){
		temp = "雷暴";
	}
	else if(icon == 70 || icon == 71 || icon == 72 || icon == 73 || icon == 74 || icon == 75){
		temp = "天色良好";
	}
	else if(icon == 76){
		temp = "大致多雲";
	}
	else if(icon == 77){
		temp = "天色大致良好";
	}
	else if(icon == 80){
		temp = "大風";
	}
	else if(icon == 81){
		temp = "乾燥";
	}
	else if(icon == 82){
		temp = "潮濕";
	}
	else if(icon == 83){
		temp = "霧";
	}
	else if(icon == 84){
		temp = "薄霧";
	}
	else if(icon == 85){
		temp = "煙霞";
	}
	else if(icon == 90){
		temp = "熱";
	}
	else if(icon == 91){
		temp = "暖";
	}
	else if(icon == 92){
		temp = "涼";
	}
	else if(icon == 93){
		temp = "冷";
	}
	else{
		temp = "天氣標記";
	}
	return temp;
}

function mapping_en(icon){
	var temp = "";
	if(icon == 50){
		temp = "Sunny";
	}
	else if(icon == 51){
		temp = "Sunny Periods";
	}
	else if(icon == 52){
		temp = "Sunny Intervals";	
	}
	else if(icon == 53){
		temp = "Sunny Periods with A Few Showers";
	}
	else if(icon == 54){
		temp = "Sunny Intervals with Showers";
	}
	else if(icon == 60){
		temp = "Cloudy";
	}
	else if(icon == 61){
		temp = "Overcast";
	}
	else if(icon == 62){
		temp = "Light Rain";
	}
	else if(icon == 63){
		temp = "Rain";
	}
	else if(icon == 64){
		temp = "Heavy Rain";
	}
	else if(icon == 65){
		temp = "Thunderstorms";
	}
	else if(icon == 70 || icon == 71 || icon == 72 || icon == 73 || icon == 74 || icon == 75){
		temp = "Fine";
	}
	else if(icon == 76){
		temp = "Mainly Cloudy";
	}
	else if(icon == 77){
		temp = "Mainly Fine";
	}
	else if(icon == 80){
		temp = "Windy";
	}
	else if(icon == 81){
		temp = "Dry";
	}
	else if(icon == 82){
		temp = "Humid";
	}
	else if(icon == 83){
		temp = "Fog";
	}
	else if(icon == 84){
		temp = "Mist";
	}
	else if(icon == 85){
		temp = "Haze";
	}
	else if(icon == 90){
		temp = "Hot";
	}
	else if(icon == 91){
		temp = "Warm";
	}
	else if(icon == 92){
		temp = "Cool";
	}
	else if(icon == 93){
		temp = "Cold";
	}
	else{
		temp = "Weather Icons";
	}
	return temp;
}