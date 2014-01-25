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

	return (text);
}

socket.on("chat", function (txt) { //reads chat lines using socket then uses simple jquery to replace the line with one containing emotes.
	var master = $('#uid').text();
	var name_usr = $('#nick').text();
	var reg_userid = /\(([^)]+)\)/;
	var reg_usr = /\<([^)]+)\>/;
	var userid = reg_userid.exec(txt)[1];
	var id_usr = reg_usr.exec(txt)[1];
	var cleanMsg = txt.split("> ")[1].toLowerCase();

	//console.log('userid: ' + userid)
	//console.log('id_usr: ' + id_usr)
	//console.log('cleanMsg: ' + cleanMsg + '\n')

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