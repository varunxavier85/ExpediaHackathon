
function daysInMonth(month,year) {
	console.log(year);
	console.log(month);
    return new Date(year, month, 0).getDate();
}

function weekend() {
var month = 2;
var year = 2016;
var daysInMonthVal = daysInMonth(month,year)


for(var i=1;i<=daysInMonthVal;i++) {
	var myDate1 = new Date(year,month,i);
	//myDate1.setFullYear(year);
	//myDate1.setMonth(month);
	//myDate1.setDate(i);
	console.log(myDate1);

}

}

weekend();