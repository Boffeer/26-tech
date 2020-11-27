function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
 
function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.timer-days_value');
  var hoursSpan = clock.querySelector('.timer-hours_value');
  var minutesSpan = clock.querySelector('.timer-minutes_value');
  var secondsSpan = clock.querySelector('.timer-seconds_value');
 
  function updateClock() {
    var t = getTimeRemaining(endtime);
 
    // daysSpan.innerHTML = t.days;

    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
 
    if (t.total <= 0) {
      // clearInterval(timeinterval);
      location.assign('http://boffeer.ru/theend.html')
      
    }

  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);  
}

if (localStorage.getItem('localTimer') == null){
  localStorage.setItem('localTimer', new Date(Date.parse(new Date()) + 2 * 60 * 1000))
}

var deadline = localStorage.getItem('localTimer');
// var deadline = new Date(Date.parse(new Date()) + 10 * 1000); // for endless timer
initializeClock('timer', deadline);

