let winItems = []

let betAmmount = document.getElementById("betAmmount");
let profile_balance = document.getElementById("profile_balance");
let balance = localStorage.getItem("currBalance");
let winAmmount = document.getElementById("winAmmount")
balance = Number(balance);
betAmmount.max = balance

function endGame() {
    const unique = [...new Set(winItems)];
    const diff = winItems.length - unique.length;
    
    tempBal = balance

    if (balance <= 0 ) {
        location.reload()
    }

   if (diff == 0) {
    balance = balance-Number(betAmmount.value)
   } 
   if (diff == 1) {
    balance = balance+Number(betAmmount.value)
   } 
   if (diff == 2) {
    switch (winItems[0]) {
        case "💵":
            balance = balance*1000*Number(betAmmount.value)
            break;
        case "7️⃣":
            balance = balance*777*Number(betAmmount.value)
            break;
        default:
            balance = balance*Number(betAmmount.value)
            break;
    }
     
   } 

    localStorage.setItem("currBalance", balance)
  
    profile_balance.innerText = "Ваш баланс : " + balance.toLocaleString()
    winAmmount.childNodes[1].textContent = (balance - tempBal).toLocaleString()
   winItems= []
   
}

profile_balance.innerText = "Ваш баланс : " + balance.toLocaleString()
if (localStorage.getItem("currBalance") == undefined || localStorage.getItem("currBalance") < 10 ) {
    localStorage.setItem("currBalance", 1000);
    location.reload()
}
else if (typeof localStorage.getItem("currBalance") == undefined) {
    localStorage.setItem("currBalance", 1000);
    location.reload()
}
else if (localStorage.getItem("currBalance") == "NaN") {
    localStorage.setItem("currBalance", 1000);
    location.reload()
}

function openHelp(){
    document.getElementById("helpScreen").style.display = "flex"
}
function closeHelp(){
    document.getElementById("helpScreen").style.display = "none"
}

const items = [
  "🍭",
  "❌",
  "⛄️",
  "🦄",
  "🍌",
  "💩",
  "👻",
  "😻",
  "💵",
  "🤡",
  "🦖",
  "🍎",
  "7️⃣"
];

const doors = document.querySelectorAll(".door");
document.querySelector("#spinner").addEventListener("click", spin);

async function spin() {
  document.getElementById("spinner").disabled = true;
  document.getElementById("betAmmount").disabled = true;
  init();
  init(false, 1, 2);
  for (const door of doors) {
    const boxes = door.querySelector(".boxes");
    const duration = parseInt(boxes.style.transitionDuration);
    boxes.style.transform = "translateY(0)";
    await new Promise((resolve) => setTimeout(resolve, duration * 100));
  }

  setTimeout(()=>{
    endGame()
    document.getElementById("spinner").disabled = false;
    document.getElementById("betAmmount").disabled = false;
    
   },3000)

}

function init(firstInit = true, groups = 1, duration = 1) {
  for (const door of doors) {
    if (firstInit) {
      door.dataset.spinned = "0";
    } else if (door.dataset.spinned === "1") {
      return;
    }

    const boxes = door.querySelector(".boxes");
    const boxesClone = boxes.cloneNode(false);

    const pool = ["❓"];
    if (!firstInit) {
      const arr = [];
      for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...items);
      }
      pool.push(...shuffle(arr));

      boxesClone.addEventListener(
        "transitionstart",
        function () {
          door.dataset.spinned = "1";
        },
        { once: true }
      );

      boxesClone.addEventListener(
        "transitionend",
        function () {
          this.querySelectorAll(".box").forEach((box, index) => {

            if (index > 0) this.removeChild(box);
          });
        },
        { once: true }
      );
    }

    pool[pool.length-1] == "❓" ? null : winItems.push(pool[pool.length-1] )
    

    for (let i = pool.length - 1; i >= 0; i--) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.width = door.clientWidth + "px";
      box.style.height = door.clientHeight + "px";
      box.textContent = pool[i];
      boxesClone.appendChild(box);
    }
    boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
    boxesClone.style.transform = `translateY(-${
      door.clientHeight * (pool.length - 1)
    }px)`;
    door.replaceChild(boxesClone, boxes);
    // console.log(door);
  }

  
}

function shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

init();
