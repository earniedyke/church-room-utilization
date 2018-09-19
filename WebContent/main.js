var scheduleDB = TAFFY([ {
	"room" : "sanctuary",
	"day" : "sunday",
	"startTime" : 7.5,
	"endTime" : 10.5,
	"desc" : "First Service"
}, {
	"room" : "sanctuary",
	"day" : "sunday",
	"startTime" : 10.5,
	"endTime" : 11.0,
	"desc" : "Intermission"
}, {
	"room" : "sanctuary",
	"day" : "sunday",
	"startTime" : 11.0,
	"endTime" : 12.5,
	"desc" : "Second Service"
}, {
	"room" : "lobby",
	"day" : "sunday",
	"startTime" : 10.5,
	"endTime" : 11.0,
	"desc" : "Intermission"
}, {
	"room" : "lobby",
	"day" : "wednesday",
	"startTime" : 18.0,
	"endTime" : 19.0,
	"desc" : "Youth Dinner"
}, {
	"room" : "youth1",
	"day" : "wednesday",
	"startTime" : 18.5,
	"endTime" : 20.0,
	"desc" : "Youth"
}, {
	"room" : "youth2",
	"day" : "wednesday",
	"startTime" : 18.5,
	"endTime" : 20.0,
	"desc" : "Youth"
}, {
	"room" : "youth3",
	"day" : "wednesday",
	"startTime" : 18.5,
	"endTime" : 20.0,
	"desc" : "Youth Dinner"
}, {
	"room" : "conference",
	"day" : "sunday",
	"startTime" : 9.0,
	"endTime" : 11.0,
	"desc" : "Church Wide Study"
}, {
	"room" : "sanctuary",
	"day" : "thursday",
	"startTime" : 19.0,
	"endTime" : 21.0,
	"desc" : "Praise Team"
}, {
	"room" : "prayer",
	"day" : "thursday",
	"startTime" : 10.0,
	"endTime" : 16.0,
	"desc" : "Healing Center"
} ])

var days = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday",
		"saturday" ]

function roomInputChange(evt) {
	var roomSelection = document.getElementById('roomInput')
	if (roomSelection.selectedIndex == 0) {
		document.getElementById('roomCalendar').innerHTML = "</p>"
		return
	}
	var roomCalendar = "<table width='100%'><thead><tr><td><span style='font-weight:bold;'>"
			+ roomSelection.options[roomSelection.selectedIndex].text
			+ "</span></td>"
	roomCalendar += "<td>Sunday</td><td>Monday</td><td>Tuesday</td><td>Wednesday</td><td>Thursday</td><td>Friday</td><td>Saturday</td>"
	roomCalendar += "</tr></thead>"
	roomCalendar += "<tbody>"
	var i = 0;
	var t = 7.0;
	for (i = 0; i < 32; i++) {
		roomCalendar += "<tr><td class='row-header'>" + fmtTime(t) + "</td>"
		var x;
		for (x in days) {
			var s = scheduleDB({
				day : {
					is : days[x]
				},
				room : {
					is : roomSelection.value
				},
				startTime : {
					lte : t
				},
				endTime : {
					gt : t
				}
			})
			roomCalendar += "<td"
			roomCalendar += s.count() == 0 ? ">"
					: " style='background:#ffffcc;'>"
			roomCalendar += s.count() == 0 ? "" : s.first().desc
			roomCalendar += "</td>"
		}
		roomCalendar += "</tr>"
		t += 0.5
	}
	roomCalendar += "</tbody>"
	roomCalendar += "</table>"
	document.getElementById('roomCalendar').innerHTML = roomCalendar
}

function fmtTime(t) {
	var minutes = (t % 1).toFixed(1) == 0 ? '00' : '30';
	var ampm = (t < 12) ? 'am' : 'pm'
	var time = Math.floor(t) > 12 ? Math.floor(t) - 12 : Math.floor(t)
	return time + ':' + minutes + ' ' + ampm
}