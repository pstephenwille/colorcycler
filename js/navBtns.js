// JavaScript Document
var makeNavBtns = function()
{


	/****************
	* 2010
	* p.stephenwille@gmail.com
	***************/
	var btn;
	var allBtns = document.getElementsByTagName('button');
	var btnClrObj = {'btn0':[255, 255, 153], 'btn1':[255, 153, 153],
					 'btn2':[102, 204, 204], 'btn3':[102, 156, 255] };
    //INITILIZE BUTTONS
	function initBtns()
	{
		for(i=0; i<allBtns.length; i++)
		{
			btn = document.getElementById(allBtns[i].id)
			btn.style.cursor = 'pointer';
			defaultBgClrs(btn.id);

			if(btn.addEventListener)
			{
				btn.addEventListener('mouseover', btnOver, false);
				btn.addEventListener('mouseout', btnOut, false);
				btn.addEventListener('mousedown', btnClick, false);
			}


		}
		clickBtn0();
	}
	initBtns();
    //ONCLICK -
	function btnClick(event)
	{	//on click, loop thrugh array to get URL
		stopEventPropagation(event);

		var btnId = getEventTarget(event);
		var btnElm = document.getElementById(btnId);
		var btnTxtClr = RGB2Color(btnClrObj[btnId][0], btnClrObj[btnId][1], btnClrObj[btnId][2]);

        //flag indicates 'contact' form fields are available.
        if(btnId == 'btn2')
            { contactBtnClicked['clicked'] = true; }


            //removes events from the clicked btn, and restores events to all other btns.
            for(var b in btnClrObj)
            {
                var _b = document.getElementById(b);

                if(b == btnId)
                {
                    if(_b.removeEventListener)
                    {
                        _b.removeEventListener('mouseover', btnOver, false);
                        _b.removeEventListener('mouseout', btnOut, false);
                        _b.removeEventListener('mousedown', btnClick, false);
                    }



                    //clicked button's BG is set to white.  zIndex brings it forward, infront of 'pageContent' div.
                    fadeColor(_b, 255, 255, 255);
                    _b.style.zIndex = '20';

                    if(_b.id == 'btn0')
                        { btnElm.style.color = '#E9B02C'; }
                    else
                        { btnElm.style.color = btnTxtClr; }

                }
                if(b != btnId)
                {
                    if(_b.addEventListener)
                    {
                        _b.addEventListener('mouseover', btnOver, false);
                        _b.addEventListener('mouseout', btnOut, false);
                        _b.addEventListener('mousedown', btnClick, false);
                    }

                    /******
                    * passes the unique BG colors (R,G,B) for each button that wasn't clicked,
                    * so they can be faded back to their correct default color.
                    * zIndex pulls them back behind the 'pageContent' div.
                    *******/
                    fadeColor(_b, btnClrObj[_b.id][0], btnClrObj[_b.id][1], btnClrObj[_b.id][2]);
                    _b.style.zIndex = '-20';
                    _b.style.color = '#333333';
                }

            }

            switch(btnElm.id)
            {
                case 'btn0':
//                    homePage();
                    break;
                case 'btn1':
//                    aboutPage();
                    break;
                case 'btn2':
//                    contactPage();
                    break;
                case 'btn3':
//                    miscPage();
                    break;
            }
    }

    //MOUSEOVER - gets moused over btn and passes to 'fadeColor()'
	function btnOver(event)
	{
		stopEventPropagation(event);

		var btnId = getEventTarget(event);
		var btnElm = document.getElementById(btnId);

		//passes (btn element, target RGB values) grey.
		fadeColor(btnElm, 191, 191, 180);
	}
    //MOUSEOUT - gets moused out btn and passes it to 'fadeColor()'
	function btnOut(event)
	{
		stopEventPropagation(event);
		var btnId = getEventTarget(event);
		var btnElm = document.getElementById(btnId);

		//passes mousedOut btn element, and RGB target values.
		fadeColor(btnElm, btnClrObj[btnElm.id][0], btnClrObj[btnElm.id][1], btnClrObj[btnElm.id][2]);

	}


		//gets and sets the RGB values of the passed in btn.
		var btnBgClr	= btnElm.style.backgroundColor;
		var btnRed, btnGreen, btnBlue;
		if(btnElm.addEventListener)
		{	//standard browser decimal color values.
			btnRed 		= (btnBgClr[4] + btnBgClr[5] + btnBgClr[6]);
			btnGreen 	= (btnBgClr[9] + btnBgClr[10] + btnBgClr[11]);
			btnBlue 	= (btnBgClr[14] + btnBgClr[15] + btnBgClr[16]);
		}
		else
		{	//IE hex color values, converted to decimal.
			btnRed 		= parseInt((btnBgClr[1] + btnBgClr[2]), 16);
			btnGreen 	= parseInt((btnBgClr[3] + btnBgClr[4]), 16);
			btnBlue 	= parseInt((btnBgClr[5] + btnBgClr[6]), 16);
		}


	/*************
	* controls color gradient speed by calling 'makeColor' with the milliseconds set in setInterval().
	* 'colorCounter' increments by 1, and each RGB value is incremented by 'stepR/G/B'.
	* the step is the diff between the start and target value for each RGB color,
	* divided by the total time for gradient to complete as contoled by 'colorTimer'.
	* once 'colorCounter' fails the loop test, it exits, setting the target RGB values.
	* explicitly setting the RGB values to their target values assures color consistency.
	* without it, the colors would likely be off by +/- the stepR/G/B.
	*************/
	function fadeColor(btnElm, targetRed, targetGreen, targetBlue)
	{
		var btn 		= document.getElementById(btnElm.id);

		//gets the RGB values of the btn at the time of the event; either grey or the defaults.
		var btnBgClr	= btnElm.style.backgroundColor;
		var btnRed, btnGreen, btnBlue;
		if(btnElm.addEventListener)
		{	//standard browser decimal color values.
			btnRed 		= (btnBgClr[4] + btnBgClr[5] + btnBgClr[6]);
			btnGreen 	= (btnBgClr[9] + btnBgClr[10] + btnBgClr[11]);
			btnBlue 	= (btnBgClr[14] + btnBgClr[15] + btnBgClr[16]);
		}
		else
		{	//IE hex color values, converted to decimal.
			btnRed 		= parseInt((btnBgClr[1] + btnBgClr[2]), 16);
			btnGreen 	= parseInt((btnBgClr[3] + btnBgClr[4]), 16);
			btnBlue 	= parseInt((btnBgClr[5] + btnBgClr[6]), 16);
		}

		//RGB values are compared to the targetR/G/B values
		//which determines if color gets scaled up or down.
		var colorTimer 		= setInterval(goGradient, 20);
		var colorCounter 	= 0;
		var myR, myG, myB 	= null;
		var stepR 			= parseInt((targetRed - btnRed)/10);
		var stepG 			= parseInt((targetGreen - btnGreen)/10);
		var stepB 			= parseInt((targetBlue - btnBlue)/10);

		function goGradient()
		{
			colorCounter++;
			myR = parseInt(btnRed) + (colorCounter * stepR);
			myG = parseInt(btnGreen) + (colorCounter * stepG);
			myB = parseInt(btnBlue) + (colorCounter * stepB);

			if(colorCounter >= 10)
			{
				 btn.style.backgroundColor = RGB2Color(targetRed, targetGreen, targetBlue);
				 //alert(myR +', '+ myG +', '+ myB);
				 clearInterval(colorTimer);
			}
			else
				{ btn.style.backgroundColor = RGB2Color(myR, myG, myB); }
		}//end makeColor
	}//end fadeColor


    //HELPER FUNCTIONS
	/***********
	* byte2Hex(r) and RGB2Color(r,g,b) - courtesy - http://krazydad.com/makecolors.php
	***********/
	function RGB2Color(r,g,b)
	    {	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b); }
	function byte2Hex(n)
	{
		var nybHexString = "0123456789ABCDEF";
		return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
	}

	//sets the btns default BG color.
	function defaultBgClrs(btnId)
	{
		//assign correct color per btn
		switch(btnId)
		{
			case 'btn0':
				btnElm = document.getElementById(btnId);
				btnElm.style.backgroundColor = '#FFFF99';
				btnElm.style.zIndex = 'auto';
				break;
			case 'btn1':
				btnElm = document.getElementById(btnId);
				btn.style.backgroundColor = '#FF9999';
				btnElm.style.zIndex = 'auto';
				break;
			case 'btn2':
				btnElm = document.getElementById(btnId);
				btn.style.backgroundColor = '#66CCCC';
				btnElm.style.zIndex = 'auto';
				break;
			case 'btn3':
				btnElm = document.getElementById(btnId);
				btn.style.backgroundColor = '#6699FF';
				btnElm.style.zIndex = 'auto';
				break;
		}
	}
	function stopEventPropagation(e)
	{
		if(e.stopPropagation)
    		{ e.stopPropagation(); }
		else//not needed as of IE9
			{ e.cancelBubble = true; }
	}
	function getEventTarget(e)
	{
		if(e.target)
			{ btnId = e.target.id; }
		else//not needed as of IE9
			{ btnId = e.srcElement.id; }
		return btnId;
	}


	function clickBtn0()
	{
		var waitForBtn0Xml = setTimeout(goForBtnN, 100);
		function goForBtnN()
		{
			var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("mousedown", false, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);

			var goBtn = document.getElementById('btn0');
				goBtn.dispatchEvent(evt);
		}
	}






}//end navBtn.js
