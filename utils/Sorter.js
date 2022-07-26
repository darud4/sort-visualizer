
const goForward = (array, start = 0, end = array.length - 1, step = 1) => {
  let queue = [];
  for (let i = start; i < end; i++) {
    if (array[i] > array[i + 1]) {
      [array[i], array[i + 1]] = [array[i + 1], array[i]];
      queue.push({ index1: i, index2: i + 1 });
    }
  }
  return queue;
};


export function sortBubble(arrayParam) {
  let queue = [];
  const array = [...arrayParam];
  let endIndex = array.length - 1;
  while (endIndex > 0) {
    queue = queue.concat(goForward(array, 0, endIndex));
    endIndex--;
  }
  //  console.log(queue);
  return queue;

}

export function sortShaker(arrayParam) {
  const queue = [];
  const array = [...arrayParam];

  const goBackward = (start, end) => {
    for (let i = end; i > start - 1; i--) {
      if (array[i] < array[i - 1]) {
        [array[i], array[i - 1]] = [array[i - 1], array[i]];
        queue.push({ index1: i, index2: i - 1 });
      }
    }
  };

  let end = array.length - 1;
  let start = 0;
  while (end > start) {
    goForward(array, start, end);
    start++;
    goBackward(start, end);
    end--;
  }
  return queue;

}

export function sortComb(arrayParam) {
  const queue = [];
  const array = [...arrayParam];

  let factor = 1.247;
  let step = array.length - 1;
  while (step >= 1) {
    for (let i = 0; i + step < array.length; i++) {
      if (array[i] > array[i + Math.round(step)]) {
        [array[i], array[i + Math.round(step)]] = [array[i + Math.round(step)], array[i]];
        queue.push({ index1: i, index2: i + Math.round(step) });
      }
    }
    step /= factor;
  }
  return queue.concat(goForward(array));
}

export function sortInsert(arrayParam) {
  const queue = [];
  const array = [...arrayParam];

  for (let i = 0; i < array.length; i++) {
    let saved = array[i];
    let j = i;
    while (j && array[j - 1] > saved) {
      queue.push({ index1: j, index2: j - 1, action: 'shift', noRender: false });
      array[j] = array[j - 1];
      j--;
    }
    array[j] = saved;
    queue.push({ action: 'set', index1: j, index2: saved });
  }
  return queue;
}


export function sortQuick(arrayParam) {
  const queue = [];
  const array = [...arrayParam];

  function recursive(array, low, high) {
    if (low < high) {
      const pivot = partition(array, low, high);
      recursive(array, low, pivot - 1);
      recursive(array, pivot + 1, high);
    }
  }

  function partition(array, left, right) {
    const pivot = array[right];
    let less = left;
    for (let i = less; i < right; i++) {
      if (array[i] < pivot) {
        [array[i], array[less]] = [array[less], array[i]];
        queue.push({ index1: i, index2: less });
        less++;
      }
    }
    [array[right], array[less]] = [array[less], array[right]];
    queue.push({ index1: right, index2: less });
    return less;
  }

  if (array.length) recursive(array, 0, array.length - 1)
  return queue;
}
