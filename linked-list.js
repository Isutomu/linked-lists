"use strict";

function node(value) {
  return { value, next: null };
}

class linkedList {
  #tailNode;
  constructor(value) {
    this.#tailNode = node(value);
    this.#tailNode.next = this.#tailNode;
  }

  append(value) {
    const newTail = node(value);

    if (!this.#tailNode.next) {
      this.#tailNode.next = newTail;
      newTail.next = this.#tailNode;
    } else {
      newTail.next = this.#tailNode.next;
      this.#tailNode.next = newTail;
    }
    this.#tailNode = newTail;
  }

  prepend(value) {
    const newHead = node(value);

    if (!this.#tailNode.next) {
      this.#tailNode.next = newHead;
      newHead.next = this.#tailNode;
    } else {
      newHead.next = this.#tailNode.next;
      this.#tailNode.next = newHead;
    }
  }

  head() {
    if (this.#tailNode.next) {
      return this.#tailNode.next.value;
    } else {
      return this.#tailNode.value;
    }
  }

  tail() {
    return this.#tailNode.value;
  }

  size() {
    let size = 1;
    let nextNode = this.#tailNode.next;

    while (nextNode && nextNode !== this.#tailNode) {
      size += 1;
      nextNode = nextNode.next;
    }

    return size;
  }

  at(index) {
    const headNode = this.#tailNode.next;

    let currentIndex = 0;
    let currentNode = headNode;

    do {
      if (currentIndex === index) {
        return currentNode.value;
      }

      currentIndex += 1;
      currentNode = currentNode.next;
    } while (currentNode !== headNode);

    return "Index too big!";
  }

  pop() {
    const headNode = this.#tailNode.next;
    if (this.#tailNode === headNode) {
      return "Only one value in linked list!";
    }

    const poppedNodeValue = this.#tailNode.value;
    let currentNode = headNode;
    while (currentNode.next !== this.#tailNode) {
      currentNode = currentNode.next;
    }

    this.#tailNode = currentNode;
    this.#tailNode.next = headNode;
    return poppedNodeValue;
  }

  contains(value) {
    const headNode = this.#tailNode.next;
    let currentNode = headNode;

    do {
      if (currentNode.value === value) {
        return true;
      }

      currentNode = currentNode.next;
    } while (currentNode !== headNode);

    return false;
  }

  find(value) {
    const headNode = this.#tailNode.next;
    let currentNode = headNode;
    let currentIndex = 0;

    do {
      if (currentNode.value === value) {
        return currentIndex;
      }

      currentIndex += 1;
      currentNode = currentNode.next;
    } while (currentNode !== headNode);

    return null;
  }

  toString() {
    const headNode = this.#tailNode.next;
    let currentNode = headNode;
    let listStringified = `( ${currentNode.value} )`;

    while (currentNode.next !== headNode) {
      currentNode = currentNode.next;
      listStringified = `${listStringified} -> ( ${currentNode.value} )`;
    }

    listStringified = `${listStringified} -> null`;
    return listStringified;
  }

  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
      return;
    }

    const headNode = this.#tailNode.next;

    let currentIndex = 1;
    let currentNode = headNode.next;
    let previousNode = headNode;

    do {
      if (currentIndex === index) {
        const newNode = new node(value);
        previousNode.next = newNode;
        newNode.next = currentNode;
        if (newNode.next === headNode) {
          this.#tailNode = newNode;
        }
        return;
      }

      currentIndex += 1;
      previousNode = currentNode;
      currentNode = currentNode.next;
    } while (previousNode !== headNode);

    return "Index too big!";
  }

  removeAt(index) {
    const headNode = this.#tailNode.next;
    if (this.#tailNode === headNode) {
      return "Only one value in linked list!";
    }

    if (index === 0) {
      this.#tailNode.next = headNode.next;
      return;
    }

    let currentIndex = 1;
    let currentNode = headNode.next;
    let previousNode = headNode;

    do {
      if (currentIndex === index) {
        previousNode.next = currentNode.next;
        if (currentNode === this.#tailNode) {
          this.#tailNode = previousNode;
        }
        return;
      }

      currentIndex += 1;
      previousNode = currentNode;
      currentNode = currentNode.next;
    } while (currentNode !== headNode);

    return "Index too big!";
  }
}
