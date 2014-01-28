//Copyright (C) 2014  CriticalNix
//
//This program is free software; you can redistribute it and/or
//modify it under the terms of the GNU General Public License
//version 2.
//
//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//A full copy of the GNU General Public License, version 2 can be found here. http://www.gnu.org/licenses/gpl-2.0.html
//-------------------------------------------------------------------
var chat_on = 1;

function gets_date() {
	var now = new Date();
	var strDateTime = [
		[AddZero(now.getHours()), AddZero(now.getMinutes()), AddZero(now.getSeconds())].join(":")].join(" ");

	function AddZero(num) {
		return (num >= 0 && num < 10) ? "0" + num : num + "";
	}
	return strDateTime;
}

function doog_regex (text) { //added regex back from dice.js, everything is looking normalish now

	//var name_usr = "the";
	var name_usr = $('#nick').text();// finds username for highlighting
	var test_text = ('(^|\s)'+name_usr+'(\s|$)', 'ig');
	text = text.replace(name_usr, "<font color='blue'><b>$&</b></font>"); //highlights username in bold and blue


	text = text.replace(/(bitcoin-talk|bticointakl)/gi, "$1 (a phishing site, do not visit)")
	text = text.replace(/lnputs[.]io/gi, "Lnputs.io (a phishing site, do not visit)")
	text = text.replace(/dicen[o0]w/gi, "dice-now")
	text = text.replace(/letsdice/gi, "lets-dice")
	text = text.replace(/(http:\/\/just-dice[.]blogspot[.](?:ca|com)\/[0-9]+\/[0-9]+\/([a-z0-9-]+)[.]html)/gi, '[<a target="_blank" href="$1">$2</a>]')
	text = text.replace(/([?]|&amp;)(r|referer)=\s*(?:.+?\b)/gi, "$1$2= [spam link] ")
	text = text.replace(/(\/ref\/[0-9a-z\/]*)/gi, " [spam link]")
	text = text.replace(/(bit[.]ly|gg[.]gg|goo[.]gl|is[.]gd)\/[a-z0-9]{4,}/gi, "[suspicious link]")
	text = text.replace(/\bbitwars\b/gi, "[spam link]")
	text = text.replace(/\bmegaapp\b/gi, "[suspicious link]")
	text = text.replace(/([a-z0-9.-_]*buybtc[a-z0-9.-_]*@gmail[.])com/gi, "I am a scammer and will steal your coins!  $1cum to meet your sticky end!")
	text = text.replace(/([a-z0-9.-_]*buybtc[a-z0-9.-_]*@gmail[.])com/gi, "")
	text = text.replace(/([^a-z])[Ã¡Â´Â¦rÃÂ³]Ã¢Â *[aÃâÃÂ]Ã¢Â *[pÃâ¬]Ã¢Â *[eÃÂµÃâ¢]/gi, "$1tickle")
	text = text.replace(/([^a-z])[Ã¡Â´Â¦rÃÂ³]Ã¢Â *[aÃâÃÂ]Ã¢Â *[pÃâ¬]Ã¢Â *iÃ¢Â *([^d])/gi, "$1tickli$2")
	text = text.replace(/([^a-z])[Ã¡Â´Â¦rÃÂ³]Ã¢Â *[aÃâÃÂ]Ã¢Â *[eÃÂµÃâ¢]Ã¢Â *[pÃâ¬]/gi, "$1tickel")
	text = text.replace(/([^a-z])[Ã¡Â´Â¦rÃÂ³]Ã¢Â *[aÃâÃÂ]Ã¢Â *[eÃÂµÃâ¢]Ã¢Â *[pÃâ¬]Ã¢Â *i/gi, "$1tickeli")
	text = text.replace(/(&lt;.*&gt;.*?)\b(butthurt)\b/i, '$1<a target="_blank" href="https://doge-dice.com/form.jpg">$2</a>')
	text = text.replace(/(dogechain[.]info\/)(?:[a-w]{2}|zh-cn)\//g,"$1")
	text = text.replace(/([^a-zA-Z0-9=?/])(?:(?:https?:\/\/)?dogechain[.]info\/tx(?:-index)?\/)?([0-9a-f]{8})([0-9a-f]{56})\b/g,'$1[<a target="_blank" href="http://dogechain.info/tx/$2$3">$2</a>]')
	text = text.replace(/([^a-zA-Z0-9=?/])(?:(?:https?:\/\/)?blockchain[.]info\/address\/)?(1[1-9A-HJ-NP-Za-km-z]{7})([1-9A-HJ-NP-Za-km-z]{24,26})\b/g,'$1[<a target="_blank" href="http://blockchain.info/address/$2$3">$2</a>]')
	text = text.replace(/\b(https?:\/\/i[.]imgur[.]com\/[0-9a-z]{5,7}[.](?:jpg|png|gif)(?:[?][0-9]+)?)\b/gi,'[<a target="_blank" href="$1">img</a>]')
	text = text.replace(/\b(https?:\/\/imgur[.]com\/(?:a|gallery)\/[0-9a-z]{5,7}\/?)(?:\b|$)/gi,'[<a target="_blank" href="$1">imgs</a>]')
	text = text.replace(/\b(https?:\/\/(?:(?:www[.])?youtube[.]com\/watch[?]v=|youtu[.]be\/)[0-9a-z_-]{11}[?]?(?:(?:&amp;)?(?:wide|(?:feature|list)=[a-z.0-9]*|t=[0-9msh]+))*)\b/gi,'[<a target="_blank" href="$1">video</a>]')
	text = text.replace(/\b(https?:\/\/(?:(?:www|r2)[.])?reddit[.]com\/r\/([a-z0-9]+)\/comments\/[a-z0-9]+\/([a-z0-9_]+)(?:\/[0-9a-z]+)?\/?)(\b| |$)/gi,'[<a target="_blank" href="$1">reddit:$2 $3</a>]$4')
	text = text.replace(/\b(https:\/\/bitcointalk[.]org\/(?:index[.]php)?[?]topic=[0-9]+(?:[.](?:new#new|(?:msg)?[0-9]+))?(?:;(?:all|topicseen))?(?:#new|#msg[0-9]+)?)\b/gi,'[<a target="_blank" href="$1">thread</a>]')

return(text);

}


function emoticons(text) { //emotes are checked and passed into a string before being sent back to chat
	var url = "https://googledrive.com/host/0BywRa_utENFgV0ZBNmdVRTJ0a0k/";

	var searchFor = /:D|:-D|Kappa|:\)|:-\)|;\)|';-\)|:\(|:-\(|:o|:\?|8-\)|:x|:P/gi;

	// A map mapping each smiley to its image
	var map = {
		":D": '/4.gif', // Capped version of the next
		":d": '/4.gif', // Lower case version of the previous
		":-D": '/4.gif', // Capped version of the next
		":-d": '/4.gif', // Lower case version of the previous
		":)": '/1.gif',
		":-)": '/1.gif',
		";)": '/3.gif',
		"';-)": '/3.gif',
		"Kappa": '/kappa.png',

		":(": '/2.gif',
		":-(": '/2.gif',
		":O": '/13.gif', // Capped version of the next
		":o": '/13.gif', // Lower case version of the previous
		":?": '/7.gif',
		"8-)": '/16.gif',

		":X": '/14.gif', // Capped version of the next
		":x": '/14.gif', // Lower case version of the previous
		":P": '/10.gif', // Capped version of the next
		":p": '/10.gif' // Lower case version of the previous
	};

	text = text.replace(searchFor, function(match) {
		var rep;

		rep = map[match];

		return rep ? '<img src="' + url + rep + '" class="emoticons" />' : match;
	});

	return doog_regex(text);
	console.log(text);
}

socket.on("chat", function (txt) { //reads chat lines using socket then uses simple jquery to replace the line with one containing emotes.
	var master = $('#uid').text();
	var name_usr = $('#nick').text();
	var reg_userid = /\(([^)]+)\)/;
	var reg_usr = /\<([^)]+)\>/;
	var userid = reg_userid.exec(txt)[1];
	var id_usr = reg_usr.exec(txt)[1];
	var cleanMsg = txt.split("> ")[1].toLowerCase();

	if (chat_on == 1) {	
		chat_line = emoticons(cleanMsg);
		$("div#chat .chatline:last-child").html(gets_date() + ' (' + userid + ') ' + '[' + id_usr + '] ' + chat_line);
	}
	
	if (userid == master && id_usr == name_usr) {
		if (cleanMsg == "!emote") {
			chat_on = !chat_on;
		}

	}	
});