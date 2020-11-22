const today = new Date();
const mlSInADay = 86400 * 1000;

// set weekDays

var weekDays = document.querySelectorAll('.week-days strong');
console.log(weekDays)
let u = 0;
// fill weekdays for last seven days
for (var i = 6; i > -1; i--) {
    let weekDay = new Date(today - (mlSInADay * i)).getDay();
    switch (weekDay) {
        case 0:
            weekDays[u].innerHTML = 'Sun';
            break;
        case 1:
            weekDays[u].innerHTML = 'Mon';
            break;
        case 2:
            weekDays[u].innerHTML = 'Tue';
            break;
        case 3:
            weekDays[u].innerHTML = 'Wed';
            break;
        case 4:
            weekDays[u].innerHTML = 'Thu';
            break;
        case 5:
            weekDays[u].innerHTML = 'Fri';
            break;
        case 6:
            weekDays[u].innerHTML = 'Sat';
            break;
    }

    u++;
    console.log(weekDay);
}

// add dates in html element on the basis of their class names 
// add dates in href  of each link tags ,it will be used to upudate Hobby Status 
var firstDay = document.querySelectorAll('.firstDay').forEach(function (ele) {
    let date = new Date(today - (mlSInADay * 6)).getDate();
    ele.innerHTML = date;
    ele.nextElementSibling.href = ele.nextElementSibling.href + `&date=${date}`;
});
var secondDay = document.querySelectorAll('.secondDay').forEach(function (ele) {
    let date = new Date(today - (mlSInADay * 5)).getDate();
    ele.innerHTML = date;
    ele.nextElementSibling.href = ele.nextElementSibling.href + `&date=${date}`;
});
var thirdDay = document.querySelectorAll('.thirdDay').forEach(function (ele) {
    let date = new Date(today - (mlSInADay * 4)).getDate();
    ele.innerHTML = date;
    ele.nextElementSibling.href = ele.nextElementSibling.href + `&date=${date}`;
});
var fourthDay = document.querySelectorAll('.fourthDay').forEach(function (ele) {
    let date = new Date(today - (mlSInADay * 3)).getDate();
    ele.innerHTML = date;
    ele.nextElementSibling.href = ele.nextElementSibling.href + `&date=${date}`;
});
var fifthDay = document.querySelectorAll('.fifthDay').forEach(function (ele) {
    let date = new Date(today - (mlSInADay * 2)).getDate();
    ele.innerHTML = date;
    ele.nextElementSibling.href = ele.nextElementSibling.href + `&date=${date}`;
});
var sixthDay = document.querySelectorAll('.sixthDay').forEach(function (ele) {
    let date = new Date(today - (mlSInADay * 1)).getDate();
    ele.innerHTML = date;
    ele.nextElementSibling.href = ele.nextElementSibling.href + `&date=${date}`;
});
var seventhDay = document.querySelectorAll('.seventhDay').forEach(function (ele) {
    let date = new Date(today - (mlSInADay * 0)).getDate();
    ele.innerHTML = date;
    ele.nextElementSibling.href = ele.nextElementSibling.href + `&date=${date}`;
});

