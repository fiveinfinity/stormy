function TimeService() {
  // returns a hash with the weekday as the key, and the UTC date as the value.
  this.nextSevenDays = function() {
    UTC = new Date(Date.now());
    dayInt = UTC.getDay();
    weekdays = {};

    for(i = 0; i < 7; i++) {
      if(i === 0) {
        day = "Today";
      } else if(i === 1) {
        day = "Tomorrow";
      } else {
        day = getDay(dayInt);
      }
      weekdays[dayInt] = [day, UTC];
      UTC = new Date(UTC.getTime() + 86400000);
      dayInt == 6 ? dayInt = 0 : dayInt++;
    }
    return weekdays;
  }
  //given the day integer, returns the day of the week.
  var getDay = function(int) {
    switch (int) {
      case 0:
          day = "Sunday";
          break;
      case 1:
          day = "Monday";
          break;
      case 2:
          day = "Tuesday";
          break;
      case 3:
          day = "Wednesday";
          break;
      case 4:
          day = "Thursday";
          break;
      case 5:
          day = "Friday";
          break;
      case 6:
          day = "Saturday";
    }
    return day;
  }

  //given the day e.g. "Sunday", returns the day of the week as an int e.g. 0.
  this.getDayInt = function(day) {
    switch (day) {
      case "Sunday":
          int = 0;
          break;
      case "Monday":
          int = 1;
          break;
      case "Tuesday":
          int = 2;
          break;
      case "Wednesday":
          int = 3;
          break;
      case "Thursday":
          int = 4;
          break;
      case "Friday":
          int = 5;
          break;
      case "Saturday":
          int = 6;
    }
    return int;
  }

  // takes the hour and period and returns military time.
  this.militaryTime = function(hour, period) {
    return period === "AM" ? parseInt(hour) : (parseInt(hour) + 12);
  }

  //takes UTC and returns 'YYYY-MM-DD' string
  this.dateParser = function(UTCdate) {
  day = UTCdate.getDate();
  month = UTCdate.getMonth();
  year = UTCdate.getFullYear();
  day = day < 10 ? (0+day) : day;
  return year+'-'+month+'-'+day;
  }
}



angular
  .module('app')
  .service('TimeService', TimeService);
