var scheduleDB = TAFFY([ {
	"room" : "sanctuary",
	"day" : "sunday",
	"startTime" : 7.5,
	"endTime" : 10.5,
	"desc" : "First Service",
	"weeks" : [1, 2, 3, 4, 5]
}, {
	"room" : "sanctuary",
	"day" : "sunday",
	"startTime" : 10.5,
	"endTime" : 11.0,
	"desc" : "Intermission",
	"weeks" : [1, 2, 3, 4, 5]
}, {
	"room" : "sanctuary",
	"day" : "tuesday",
	"startTime" : 18.30,
	"endTime" : 19.00,
	"desc" : "Leadership Board",
	"weeks": [4]
}, {
	"room" : "youth1",
	"day" : "tuesday",
	"startTime" : 19.00,
	"endTime" : 21.00,
	"desc" : "Leadership Board",
	"weeks" : [4]
}, {
	"room" : "youth2",
	"day" : "tuesday",
	"startTime" : 19.00,
	"endTime" : 21.00,
	"desc" : "Leadership Board",
	"weeks" : [4]
}, {
	"room" : "sanctuary",
	"day" : "sunday",
	"startTime" : 11.0,
	"endTime" : 12.5,
	"desc" : "Second Service",
	"weeks" : [1, 2, 3, 4, 5]
}, {
	"room" : "lobby",
	"day" : "sunday",
	"startTime" : 10.5,
	"endTime" : 11.0,
	"desc" : "Intermission",
	"weeks" : [1, 2, 3, 4, 5]
}, {
	"room" : "lobby",
	"day" : "wednesday",
	"startTime" : 18.0,
	"endTime" : 19.0,
	"desc" : "Youth Dinner",
	"weeks" : [1, 2, 3, 4, 5]
}, {
	"room" : "youth1",
	"day" : "wednesday",
	"startTime" : 18.5,
	"endTime" : 20.0,
	"desc" : "Youth",
	"weeks" : [1, 2, 3, 4, 5]
}, {
	"room" : "youth2",
	"day" : "wednesday",
	"startTime" : 18.5,
	"endTime" : 20.0,
	"desc" : "Youth",
	"weeks" : [1, 2, 3, 4, 5]
}, {
	"room" : "youth3",
	"day" : "wednesday",
	"startTime" : 18.5,
	"endTime" : 20.0,
	"desc" : "Youth Dinner",
	"weeks" : [1, 2, 3, 4, 5]
}, {
	"room" : "conference",
	"day" : "thursday",
	"startTime" : 19.0,
	"endTime" : 21.0,
	"desc" : "Miracle Seekers",
	"weeks" : [1,3]
}, {
	"room" : "conference",
	"day" : "thursday",
	"startTime" : 18.0,
	"endTime" : 19.0,
	"desc" : "Trustees",
	"weeks" : [3]
}, {
	"room" : "sanctuary",
	"day" : "thursday",
	"startTime" : 19.0,
	"endTime" : 21.0,
	"desc" : "Praise Team",
	"weeks" : [1, 2, 3, 4, 5]
}, {
	"room" : "prayer",
	"day" : "sunday",
	"startTime" : 17.0,
	"endTime" : 19.0,
	"desc" : "Bible Study",
	"weeks" : [1,2,3,4,5]	
}, {
	"room" : "prayer",
 	"day" : "wednesday",
	"startTime" : 18.0,
	"endTime" : 21.0,
	"desc" : "Youth",
	"weeks" : [1,2,3,4,5]
}, {
	"room" : "prayer",
	"day" : "thursday",
	"startTime" : 10.0,
	"endTime" : 16.0,
	"desc" : "Healing Center",
	"weeks" : [1, 2, 3, 4, 5]
}, {
	"room" : "prayer",
	"day" : "sunday",
	"startTime" : 7.5,
	"endTime" : 9.0,
	"desc" : "Michael Diggs",
	"weeks" : [1, 2, 3, 4, 5]	
}, {
	"room" : "prayer",
	"day" : "friday",
	"startTime" : 17.0,
	"endTime" : 20.0,
	"desc" : "Community Prayer",
	"weeks" : [1, 3]
	
} ])

var days = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday",
		"saturday" ]

function roomInputChange(evt) {
	var roomSelection = document.getElementById('roomInput')
	var weekSelection = document.getElementById('weekInput')
	
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
			if (weekSelection.selectedIndex > 0) {
				if (typeof s.first().weeks != 'undefined') {
					var weekSelected = weekSelection.options[weekSelection.selectedIndex].value
					var weeks = s.first().weeks
					if (weeks.find(week =>  week == weekSelected) > 0) {
						// do nothing
					} else { 
						continue; 
					}
				}
			}
			roomCalendar += "<td"
			roomCalendar += s.count() == 0 ? ">"
					: " style='background:#ffffcc;'>"
			roomCalendar += s.count() == 0 ? "" : s.first().desc
			if (typeof s.first().weeks != 'undefined') {
				roomCalendar += "&nbsp;(<b>"
				roomCalendar += s.first().weeks
				roomCalendar += "</b>)"
			}
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