import Visualizer from "../utils/Visualizer.js";
import { sortBubble, sortShaker, sortComb, sortInsert } from "../utils/Sorter.js";

const visualizer = new Visualizer('.sorter');

const sortButton = document.querySelector('.button_type_sort');
const generateButton = document.querySelector('.button_type_generate');

//const method = sortBubble;
//const method = sortComb;
const method = sortInsert;

generateButton.addEventListener('click', () => {
  const arr = visualizer.generate(30);
});

sortButton.addEventListener('click', () => { visualizer.drawQueue(method, 50); });
