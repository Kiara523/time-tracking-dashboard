const dailyBtn = document.querySelector("#daily");
const weeklyBtn = document.querySelector("#weekly");
const monthlyBtn = document.querySelector("#monthly");

const currentHour = document.querySelectorAll(".time-track");
const previousHour = document.querySelectorAll(".previous");

//display daily time tracking as default
const setDefaultTrackingData = (data) => {
  dailyBtn.onload = dailyBtn.classList.add("btn-active");
  updateTrackingData(data, "daily", "Yesterday - ");
};

// set event listeners for the buttons
const setEventListeners = (data) => {
  dailyBtn.addEventListener("click", () => {
    dailyBtn.classList.add("btn-active");
    weeklyBtn.classList.remove("btn-active");
    monthlyBtn.classList.remove("btn-active");
    const targetID = dailyBtn.getAttribute("id");
    const message = "Yesterday - ";
    updateTrackingData(data, targetID, message);
  });

  weeklyBtn.addEventListener("click", () => {
    weeklyBtn.classList.add("btn-active");
    dailyBtn.classList.remove("btn-active");
    monthlyBtn.classList.remove("btn-active");
    const targetID = weeklyBtn.getAttribute("id");
    const message = "Last Week - ";
    updateTrackingData(data, targetID, message);
  });

  monthlyBtn.addEventListener("click", () => {
    monthlyBtn.classList.add("btn-active");
    dailyBtn.classList.remove("btn-active");
    weeklyBtn.classList.remove("btn-active");

    const targetID = monthlyBtn.getAttribute("id");
    const message = "Last Month - ";
    updateTrackingData(data, targetID, message);
  });
};

// fecth data from json file
const fecthAllReports = async () => {
  const response = await fetch("./data.json");
  const jsonData = await response.json();
  return jsonData;
};

// change the paragraph text to display selected data
const updateTrackingData = (data, targetID, message) => {
  data.forEach((element, i) => {
    currentHour[i].textContent = `${element.timeframes[targetID].current}hrs`;
    previousHour[
      i
    ].textContent = `${message}${element.timeframes[targetID].previous}hrs`;
  });
};

// await data from json file, display the default for daily time tracking, set the event listeners
const initializeTrackingDashboard = async () => {
  const data = await fecthAllReports();
  setDefaultTrackingData(data);
  setEventListeners(data);
};

initializeTrackingDashboard();
