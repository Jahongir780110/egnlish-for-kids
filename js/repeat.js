import {changeMode, fillCards} from "./helper.js";
import {toggleCheckbox, cardList} from "./elements.js";
import {initGame} from "./startGame.js";
import {initNav} from "./nav.js";

const stats = JSON.parse(localStorage.getItem("statistics"));
const data = [];
let count = 0;

setTimeout(() => {
  initNav();
  initGame(data);
}, 0);

stats.sort((a, b) => {
  a = a.wrong === 0 ? 0 : a.wrong / a.clicksGame;
  b = b.wrong === 0 ? 0 : b.wrong / b.clicksGame;

  return b - a;
});

for (const stat of stats) {
  const val = stat.wrong === 0 ? 0 : stat.wrong / stat.clicksGame;
  if (val === 0 || count === 7) break;

  data.push(stat);
  count++;
}

fillCards(data, cardList);

toggleCheckbox
  .querySelector("input[type=checkbox]")
  .addEventListener("change", (e) => {
    changeMode(e.target.checked, cardList, true);
  });