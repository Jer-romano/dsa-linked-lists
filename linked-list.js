/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */
class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */
  push(val) {
    let newNode = new Node(val);
    if(this.head === null) { //list is empty
      this.head = newNode;
      this.tail = newNode;

    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return undefined;

  }

  /** unshift(val): add new value to start of list. */
  unshift(val) {
    let newNode = new Node(val);
     if(this.head === null) { //list is empty
      this.head = newNode;
      this.tail = newNode;

    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return undefined;
  }

  /** pop(): return & remove last item. */
  pop() {
    let temp;
    if (this.head === null) throw RangeError("Error: Attempting to pop() empty list.")
    if(this.head === this.tail) { //there is only 1 item
      temp = this.head;
      this.head = null;
      this.tail = null;
    } else {
      let curr = this.head;
      while(curr.next !== this.tail) {
        curr = curr.next;
      }
      temp = this.tail;
      this.tail = curr;
    }
    this.length--;
    return temp.val;
  }

  /** shift(): return & remove first item. */
  shift() {
    let temp;
    if (this.head === null) throw RangeError("Error: Attempting to shift() empty list.")
    if(this.head === this.tail) { //there is only 1 item
      temp = this.head;
      this.head = null;
      this.tail = null;
    } else {
      temp = this.head;
      this.head = this.head.next;
    }
    this.length--;
    return temp.val;
  }

  /** getAt(idx): get val at idx. */
  getAt(idx) {
    if(idx < 0 || idx >= this.length) throw Error("Error: Requested index is out-of-bounds.")
    if(idx == this.length-1) return this.tail.val;
    else {
      let curr = this.head;
      for(let i = 0; i < idx; i++) {
        curr = curr.next;
      }
      return curr.val;
    }
  }

  /** setAt(idx, val): set val at idx to val */
  setAt(idx, val) {
    if(idx < 0 || idx >= this.length) throw Error("Error: Requested index is out-of-bounds.")
    let curr = this.head;
    if(idx == 0) {
      this.head.val = val;
    }
    if(idx == this.length-1) this.tail.val = val;
      // 0 1 2 3 
    else {
        for(let i = 0; i < idx; i++) {
          curr = curr.next;
        }
        curr.val = val;
    }
    
  }

  /** insertAt(idx, val): add node w/val before idx. */
  // 4 8 2 7 5  Insert before 2
  // 0 1 2 3 4
  insertAt(idx, val) {
    if(idx == 0) this.unshift(val);
    else if(idx == this.length) this.push(val);
    else {
      if(idx < 0 || idx > this.length) 
      throw Error(`Error: Requested index (${idx}) is out-of-bounds. val=${val}`);
      else {
        let newNode = new Node(val);
        let curr = this.head;
         for(let i = 0; i < idx-1; i++) { // idx-1 because we want to insert Before the requested idx
            curr = curr.next;
         }
          let afterNode = curr.next;
          curr.next = newNode;
          newNode.next = afterNode;
          this.length++;
          return undefined;
      }
    }
  }

  /** removeAt(idx): return & remove item at idx, */
  removeAt(idx) {
    if(idx == 0 && this.length == 1) { //removing from 1 item list
      let toReturn = this.head;
      this.head = null;
      this.tail = null;
      this.length--;
      return toReturn;
    }
    if(idx < 0 || idx >= this.length) throw Error("Error: Requested index is out-of-bounds.");
    if(idx == 0) { //removing head
      let node = this.head;
      this.head = this.head.next;
      this.length--;
      return node;
    }
    else {
      let curr = this.head;
      for(let i = 0; i < idx-1; i++) {
          curr = curr.next;
      }
      let beforeNode = curr;
      let toReturn = curr.next;
      let afterNode = curr.next.next;
      beforeNode.next = afterNode;
      if(idx == this.length-1) this.tail = beforeNode;
  
      this.length--;
      return toReturn;
    }
  }

  /** average(): return an average of all values in the list */
  average() {
    if (this.length == 0) return 0;
    let total = 0;
    let curr = this.head;
    for(let i = 0; i < this.length; i++) {
        total += curr.val;
        curr = curr.next;
    }
    return total / this.length;
  }
}

module.exports = LinkedList;
