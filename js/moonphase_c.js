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
 
document.write("<div name=\"image\" id=\"image\" class=\"image\"><IMG SRC=\"icon30/MOON" + ph + "0" + pt + ".jpg\" ALT=\"" + AltC + "\" TITLE=\"" + AltC + "\"></div>");
