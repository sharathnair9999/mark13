function reverseStr(str){
  return str.split('').reverse().join('')
}
function isPalindrome(str){
  var reversed = reverseStr(str);

  return reversed === str
}

function dateToString(date){
  var dateToStr = {day:'', month:'', year:''};
  if(date.day<10){
    dateToStr.day='0'+date.day;
  }
  else{
    dateToStr.day=date.day.toString();
  }
  if(date.month<10){
    dateToStr.month='0'+date.month;
  }
  else{
    dateToStr.month=date.month.toString();
  }
  dateToStr.year=date.year.toString();
  
  return dateToStr;
}

function getDateInAllFormats(date){
  
  var dateStr = dateToString(date)
  var ddmmyyyy = dateStr.day + dateStr.month+dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month+ dateStr.day+dateStr.year.slice(-2);
  var yymmdd= dateStr.year.slice(-2)+dateStr.month+dateStr.day;
  
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  
}

function checkPalindromeForAllFormats(date){
  var dates= getDateInAllFormats(date)
  var flag = false;
  for(i=0;i<dates.length;i++){
    if(isPalindrome(dates[i]))
    flag = true;
    break;
  }
  return flag;
}

function isLeapYear(year){
  if(year%400===0){
    return true;
  }
  if(year%100===0){
    return false;
  }
  if(year%4===0){
    return true;
  }
  return false;
}

function getNextDate(date){
	var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	var day = date.day+1;
	var month = date.month;
	var year = date.year;

	if(month === 2 ){
		if(isLeapYear(year)){
			if(day>29){
				day=1;
				month++;
			}
		}
		else{
			if(day>28){
				day=1;
				month++;
			}
		}
	}
	else{
		if(day > daysInMonth[month-1]){
			day=1;
			month++;
		}
		if(month>12){
			month=1;
			year++;
		}
	}
	return {
		day: day,
		month: month,
	year: year
	};
}

function getPreviousDate(date){
  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
  var day = date.day-1;
	var month = date.month;
	var year = date.year;
  if(month===3){
    if(isLeapYear(year)){
      if(day<1){
        day =29;
        month--;
      }
    }
    
  }
  if(day<1){
    day=daysInMonth[month-2]
    month--;
  }
  if(month<1){
    month=12;
    year--;
  }
  return {
		day: day,
		month: month,
	year: year
	};
}

function getNextPalindrome(date) {
	var ctr=0;
	var nextDate = getNextDate(date);
	 while(1){
		 ctr++;
		var isPalindrome = checkPalindromeForAllFormats(nextDate)
			 if(isPalindrome){
				 break;
			 }
		 nextDate = getNextDate(nextDate);
	 }
	return [ctr, nextDate];
}

function getPreviousPalindrome(date){
  var ctr=0;
  var previousDate = getPreviousDate(date)
  while(1){
    ctr++;
    var isPalindrome = checkPalindromeForAllFormats(previousDate)
    if(isPalindrome){
      break;
    }
    previousDate = getPreviousDate(previousDate)
  }
  return [ctr,previousDate];
}

const inputRef = document.querySelector('#input-date')
const showBtn = document.querySelector('#show-btn')
const resultRef = document.querySelector('#result')

function clickHandler(e){
  var dateToStr = inputRef.value;
  
  if (dateToStr!==''){
    var listOfDate = dateToStr.split('-');
    var date = {
      day: Number(listOfDate[2]),
      month : Number(listOfDate[1]),
      year  : Number(listOfDate[0]) 
    }

    var isPalindrome = checkPalindromeForAllFormats(date);

    if(isPalindrome){
      resultRef.innerText = "Yay!! Your Birthday is a Palindrome!!"
    }
    else{
      var[nextCtr,nextDate] = getNextPalindrome(date);
      var [previousCtr,previousDate ] = getPreviousPalindrome(date)
      console.log("next ",[nextCtr,nextDate])
      console.log("previous",[previousCtr,previousDate])
      if(nextCtr<previousCtr){
        resultRef.innerText = `Oops! That's not a Palindrome Date. The Next Palindrome Date is ${nextDate.day}-${nextDate.month}-${nextDate.year} after ${nextCtr} days!!!`
      }
      else
      resultRef.innerText = `Oops! That's not a Palindrome Date. The last palindrome was ${previousDate.day}-${previousDate.month}-${previousDate.year} before ${previousCtr} days!!!`

    }


  }
}

showBtn.addEventListener("click", clickHandler);


var date = {
  day:1 ,
  month:3,
  year: 2020
}
// console.log(getPreviousPalindrome(date))