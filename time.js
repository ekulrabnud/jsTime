function log(){

	for (var i=0;i < arguments.length;i++){
		console.log(arguments[i]);
	}

	

}

testevent ={
	'date':"2016-09-24",
	'start':"22:30",
	'stop':"23:14",
	'event':"test"
}

function split(time,delimiter){

	splitTime = time.split(delimiter)

	for (i in splitTime){
		splitTime[i] = parseInt((splitTime[i]));
	}

	return splitTime
}

function isEventOn(event,future){
	// offset provided so that we can see events in the future.

	var now = new Date();
	
	future = new Date(now.getTime() + (future * 60000))


	date = event['date'].split('-');
	start = event['start'].split(':');
	stop = event['stop'].split(':');

	year = parseInt(date[0])
	//Date object assignes JAN as month 0..therefore subtract 1
	month = (parseInt(date[1])) - 1;
	day = parseInt(date[2])
	startHour = parseInt(start[0]);
	startMin = parseInt(start[1]);

	stopHour = parseInt(stop[0]);
	stopMin = parseInt(stop[1]);

	// Create duration using start and stop hr/min

	duration = (((stopHour * 60) + stopMin) - ((startHour * 60) + startMin)); 

	// if duration < 0 then event runs into next day 
	if (duration < 0){

		duration = (1440 - ((startHour * 60) + startMin)) + ((stopHour * 60) + stopMin)
	}
	duration = duration * 60000;

	eventStartTime = new Date(year,month,day,startHour,startMin);
	eventStopTIme = new Date(eventStartTime.getTime() + duration);



	log(now,future,eventStartTime,eventStopTIme)

	if (now < eventStopTIme && future > eventStartTime){
		log("event active")}
	else{
		log("event finished")
	}


	

	return true;
}


isEventOn(testevent,30)



