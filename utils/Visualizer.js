export default class Visualizer {

  constructor(selector) {
    this._array = [];
    this._element = document.querySelector(selector);
  }

  generate(count = 100) {
    const numbers = [];
    const finalArray = [];
    for (let i = 0; i < count; i++) {
      numbers[i] = i + 1;
    }
    while (numbers.length > 0) {
      const index = Math.floor(Math.random() * numbers.length);
      finalArray.push(numbers[index]);
      numbers.splice(index, 1);
    }
    this._array = finalArray;
    this.render();
    return finalArray;
    //    console.log(finalArray);
  }

  render(index1, index2) {
    //    console.log(this._element.clientWidth, this._element.clientHeight);
    const barWidth = this._element.clientWidth / this._array.length;
    const barHeight = 0.8 * this._element.clientHeight / this._array.length;
    this._element.innerHTML = '';
    for (let i = 0; i < this._array.length; i++) {
      const li = document.createElement('li');
      li.classList.add('sorter__item');
      if (i === index1 || i === index2) li.classList.add('sorter__item_active');
      li.style.height = `${barHeight * this._array[i]}px`;
      li.style.width = `${barWidth}px`;
      this._element.append(li);
    }
  }

  async drawQueue(callback, delay) {
    const queue = callback(this._array);
    const array = this._array;
    while (queue.length > 0) {
      const { index1, index2, action = 'swap', noRender = false } = queue.shift();
      switch (action) {
        case 'swap':
          [array[index1], array[index2]] = [array[index2], array[index1]];
          break;
        case 'shift':
          array[index1] = array[index2];
          break;
        case 'set':
          array[index1] = index2;
          break;
      }
      if (!noRender) {
        this.render(index1, action === 'set' ? '' : index2);
        await this._wait(delay);
      }
    }
  }

  async _wait(ms) {
    await new Promise((res, rej) => { setTimeout(res, ms) });
  }

}
