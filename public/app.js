// create sample data
let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
let myData = {
};

function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function randomUsage(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

for (let i = 0; i < 12; i++) {
  myData[months[i]] = [];
  for (let j = 1; j <= daysInMonth(new Date(2020, months.indexOf(months[i]))); j++) {
    myData[months[i]].push({
      [`${j}`]: [
        {
          gas: randomUsage(8, 12),
          electricity: randomUsage(10, 20),
          water: randomUsage(60, 110)
        }
      ]
    });
  }
}

// randomize daily usage
const dailyEstimates = document.querySelectorAll('.daily-estimate');
dailyEstimates.forEach((estimate) => {
  estimate.textContent = randomUsage(80, 200);
});

function randomUsage(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

document.querySelector('.time-remaining').textContent = randomUsage(1, 10);
// filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach((btn) => {
  let filter = btn.dataset.filter;
  btn.addEventListener('click', () => {
    console.log(filter);
    let targets = document.querySelectorAll(`div[data-filter=${filter}`);
    targets.forEach((target) => {
      target.classList.remove('hidden');
      if (filter === 'month') {
        target.innerHTML = displayMonths();
      } else if (filter === 'day') {
        target.innerHTML = displayDay();
      }
    });
    document.querySelectorAll(`section div:not([data-filter=${filter}])`).forEach((item) => {
      item.classList.add('hidden');
    });
  });
});

// turns months data to markup
function displayMonths() {
  let months = Object.keys(myData);
  let totalMonthData = months.map((month) => {
    let monthData = getMonthData(month);
    return ` <ul>
         <h4>${month.toUpperCase()}</h4>
         <li><p>Gas: <span>${monthData.gasArray.reduce((accumulator, currentValue) => accumulator + currentValue)}</span> kg</p></li>
         <li><p>Electricity: <span>${monthData.electricityArray.reduce((accumulator, currentValue) => accumulator + currentValue)}</span>kWh</p></li>
         <li><p>Water: <span>${monthData.waterArray.reduce((accumulator, currentValue) => accumulator + currentValue)}</span>Litres</p></li>
       </ul>`;
  });
  totalMonthData = totalMonthData.join('');
  return totalMonthData;
}

// get specific usage for a given month
function getMonthData(month) {
  let gasArray = [];
  let electricityArray = [];
  let waterArray = [];

  let monthData = myData[month];
  for (const item in monthData) {
    if (monthData.hasOwnProperty(item)) {
      const element = monthData[item];
      for (const day in element) {
        if (element.hasOwnProperty(day)) {
          const element1 = element[day];
          gasArray.push(element1[0].gas);
          electricityArray.push(element1[0].electricity);
          waterArray.push(element1[0].water);
        }
      }
    }
  }
  return {
    gasArray: gasArray,
    electricityArray: electricityArray,
    waterArray: waterArray
  };
}

// display daily usage markup
function displayDay() {
  let currentMonth = new Date().getMonth();
  let currentMonthArr = myData[months[currentMonth]];
  let displayCurrentMonthArr = currentMonthArr.map((day) => {
    let currentDay = day[Object.keys(day)[0]];
    return `<ul>
    <h3>${months[currentMonth].toUpperCase()}, ${Object.keys(day)[0]}, ${new Date().getFullYear()}</h3>
    <li>
      <p>Gas Usage: </p>
      <meter min="0" max="20" value="${currentDay[0].gas}"></meter>
      <span>${currentDay[0].gas} kg</span>

      <p>Electricity Usage: </p>
      <meter min="0" max="30" value="${currentDay[0].electricity}"></meter>
      <span>${currentDay[0].electricity} kWh</span>

      <p>Water Usage: </p>
      <meter min="0" max="120" value="${currentDay[0].water}"></meter>
      <span>${currentDay[0].water} Litres</span>
    </li>
  </ul>`;
  });
  displayCurrentMonthArr = displayCurrentMonthArr.join('');
  return displayCurrentMonthArr;
}
