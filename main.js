// =====================================================
//  APEX — JavaScript (simple version)
//  Flowbite already handles: carousel, accordion, modal, drawer.
//  This file adds everything else.
// =====================================================


// ===== 1. DAY / NIGHT MODE (remembers your choice) =====
var themeBtn = document.getElementById("themeBtn");
var html = document.documentElement;   // the <html> tag

// if the user chose "light" last time, remove the word "dark"
if (localStorage.getItem("theme") === "light") {
  html.classList.remove("dark");
}

themeBtn.addEventListener("click", function () {
  html.classList.toggle("dark");      // add or remove "dark"

  if (html.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});


// ===== 2. COUNTDOWN TIMER =====
// the race starts in 2 days, 14 hours, 39 minutes and 12 seconds
var raceTime = new Date().getTime() + ((2 * 24 + 14) * 60 * 60 + 39 * 60 + 12) * 1000;

// 5 becomes "05"
function addZero(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

function updateTimer() {
  var left = raceTime - new Date().getTime();   // milliseconds left
  if (left < 0) {
    left = 0;
  }

  var days = Math.floor(left / (1000 * 60 * 60 * 24));
  var hours = Math.floor((left / (1000 * 60 * 60)) % 24);
  var minutes = Math.floor((left / (1000 * 60)) % 60);
  var seconds = Math.floor((left / 1000) % 60);

  document.getElementById("days").textContent = addZero(days);
  document.getElementById("hours").textContent = addZero(hours);
  document.getElementById("minutes").textContent = addZero(minutes);
  document.getElementById("seconds").textContent = addZero(seconds);
}

updateTimer();
setInterval(updateTimer, 1000);   // run again every 1 second


// ===== 3. LIVE NUMBERS (hero card + gauge + bars) =====
// gives a random number between min and max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateNumbers() {
  // hero card
  document.getElementById("heroSpeed").textContent = random(340, 366);
  document.getElementById("heroAngle").textContent = random(55, 66) + "°";

  // gauge: the arc is 198 long when full (speed 400)
  var speed = random(300, 380);
  document.getElementById("gaugeNum").textContent = speed;
  var arcLength = (speed / 400) * 198;
  document.getElementById("gaugeArc").setAttribute("stroke-dasharray", arcLength + " 264");

  // three bars
  var throttle = random(70, 95);
  var brake = random(5, 30);
  var gForce = (random(12, 29) / 10).toFixed(1);   // 1.2 ... 2.9

  document.getElementById("bar1").style.height = throttle + "%";
  document.getElementById("val1").textContent = throttle + "%";
  document.getElementById("bar2").style.height = brake + "%";
  document.getElementById("val2").textContent = brake + "%";
  document.getElementById("bar3").style.height = (gForce / 3) * 100 + "%";
  document.getElementById("val3").textContent = gForce + "G";
}

setInterval(updateNumbers, 1500);   // every 1.5 seconds


// ===== 4. STANDINGS: MotoGP / Moto2 / Moto3 TABS =====
// each row: name, country, team, bike, points
var data = {
  motogp: [
    ["Franchesko Bagnaia", "Italiya", "Ducati Lenovo Team", "Ducati Desmosedici", 298],
    ["Xorxe Martín", "Ispaniya", "Prima Pramac Racing", "Ducati Desmosedici", 293],
    ["Marc Márquez", "Ispaniya", "Gresini Racing MotoGP", "Ducati Desmosedici", 229]
  ],
  moto2: [
    ["Ay Ogura", "Yaponiya", "MT Helmets MSI", "Boscoscuro", 210],
    ["Fermin Aldeguer", "Ispaniya", "Beta Tools SpeedUp", "Boscoscuro", 201],
    ["Sergio Garsiya", "Ispaniya", "Pons Wegow", "Kalex", 176]
  ],
  moto3: [
    ["Daniel Xolgado", "Ispaniya", "CFMoto Aspar", "KTM", 185],
    ["Xose Antonio Rueda", "Ispaniya", "Red Bull KTM Ajo", "KTM", 171],
    ["Kolin Veyk", "Avstraliya", "Honda Team Asia", "Honda", 150]
  ]
};

// small round photos (riders without a photo get a red circle with a letter)
var avatars = {
  "Franchesko Bagnaia": "images/avatar-bagnaia.png",
  "Xorxe Martín": "images/avatar-martin.png",
  "Marc Márquez": "images/avatar-marquez.png"
};

var tableBody = document.getElementById("tableBody");

// builds the table rows for one class (for example "moto2")
function showTable(className) {
  var rows = data[className];
  var result = "";

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var numberColor = "soft";
    if (i === 0) {
      numberColor = "accent";   // first place is red
    }

    result += '<tr class="border-b line">';
    result += '<td class="py-5 mono text-4xl ' + numberColor + '">0' + (i + 1) + "</td>";
    // photo (or letter) + name + country
    var photo = avatars[r[0]];
    var avatar = "";
    if (photo) {
      avatar = '<img src="' + photo + '" alt="" class="w-9 h-9 rounded-full object-cover">';
    } else {
      avatar = '<div class="w-9 h-9 rounded-full bg-red-600 text-white grid place-items-center text-xs font-bold">' + r[0].charAt(0) + "</div>";
    }
    result += '<td><div class="flex items-center gap-3">' + avatar + '<div><p class="text-sm font-bold uppercase">' + r[0] + '</p><p class="text-[9px] soft uppercase">' + r[1] + "</p></div></div></td>";
    result += '<td class="text-xs soft">' + r[2] + "</td>";
    result += '<td class="text-xs soft">' + r[3] + "</td>";
    result += '<td class="text-right mono text-lg">' + r[4] + "</td>";
    result += "</tr>";
  }

  tableBody.innerHTML = result;
}

var tabs = document.querySelectorAll(".tab");

for (var t = 0; t < tabs.length; t++) {
  tabs[t].addEventListener("click", function () {
    // make all tabs gray
    for (var j = 0; j < tabs.length; j++) {
      tabs[j].classList.remove("bg-red-600", "text-white");
      tabs[j].classList.add("bg-gray-500/20", "soft");
    }
    // make the clicked tab red
    this.classList.remove("bg-gray-500/20", "soft");
    this.classList.add("bg-red-600", "text-white");

    showTable(this.dataset.class);   // data-class="moto2" in the HTML
  });
}


showTable("motogp");   // show the first table (with photos) when the page opens


// ===== 5. LEGEND RIDERS: arrows + click to highlight =====
var riderRow = document.getElementById("riderRow");

document.getElementById("riderNext").addEventListener("click", function () {
  riderRow.scrollBy({ left: 280, behavior: "smooth" });
});

document.getElementById("riderPrev").addEventListener("click", function () {
  riderRow.scrollBy({ left: -280, behavior: "smooth" });
});

var riders = document.querySelectorAll(".rider");

for (var k = 0; k < riders.length; k++) {
  riders[k].addEventListener("click", function () {
    // remove the red frame from all cards
    for (var m = 0; m < riders.length; m++) {
      riders[m].classList.remove("ring-2", "ring-red-500");
    }
    // add the red frame to the clicked card
    this.classList.add("ring-2", "ring-red-500");
  });
}


// ===== 6. ARTICLE: "Maqolani o'qish" shows more text =====
var readBtn = document.getElementById("readBtn");
var moreText = document.getElementById("moreText");

readBtn.addEventListener("click", function () {
  moreText.classList.toggle("hidden");   // show or hide the text

  if (moreText.classList.contains("hidden")) {
    readBtn.textContent = "Maqolani o’qish";
  } else {
    readBtn.textContent = "Yopish";
  }
});


// ===== 7. SIGN IN FORM =====
var loginForm = document.getElementById("loginForm");
var message = document.getElementById("message");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();   // do not reload the page

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // email must contain "@", password must have 6+ characters
  if (email.includes("@") && password.length >= 6) {
    message.textContent = "Xush kelibsiz!";
    message.style.color = "green";

    // show the name (before @) on the header button
    document.getElementById("signinBtn").textContent = email.split("@")[0];

    // close the modal after 1 second
    setTimeout(function () {
      document.getElementById("closeSignin").click();
      message.textContent = "";
    }, 1000);
  } else {
    message.textContent = "Email yoki parol noto’g’ri.";
    message.style.color = "red";
  }
});