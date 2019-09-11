// Doubly Linked List
function LinkNode(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
}

function LinkList() {
    this.head = null;
    this.tail = null;

    this.length = 0;
}

LinkList.prototype.append = function (value) {
    let node = new LinkNode(value);

    if (this.length === 0) {
        this.head = node;
        this.tail = node;
    } else {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    this.length++;

    return node;
};

LinkList.prototype.appendAt = function (pos, value) {
    if (pos < 0 || pos > this.length) {
        return null;
    }

    let current = this.head;
    let currentIndex = 0;
    let node = new LinkNode(value);

    if (pos === 0) {
        current.prev = node;
        node.next = current;
        this.head = node;
    } else {
        while (currentIndex++ !== pos) {
            current = current.next;
        }

        node.prev = current.prev;
        current.prev.next = node;

        node.next = current;
        current.prev = node;
    }

    this.length++;

    return node;
};

LinkList.prototype.remove = function (value) {
    let current = this.head;

    while (current) {
        if (current.value === value) {
            if (current === this.head && current === this.tail) {
                this.head = null;
                this.tail = null;
            } else if (current === this.head) {
                this.head = current.next;
                this.head.prev = null;
            } else if (current === this.tail) {
                this.tail = current.prev;
                this.tail.next = null;
            } else {
                current.prev.next = current.next;
                current.next.prev = current.prev;

                current.prev = null;
                current.next = null;
            }
            this.length--;
            return current;
        }
        current = current.next;
    }
    return null;

};

LinkList.prototype.removeAt = function (pos) {
    if (pos < 0 || pos > this.length) {
        return null;
    }

    let current = this.head;
    let index = 0;

    while (index++ !== pos) {
        current = current.next;
    }

    if (current === this.head && current === this.tail) {
        this.head = null;
        this.tail = null;
    } else if (current === this.head) {
        this.head = current.next;
        this.head.prev = null;
    } else if (current === this.tail) {
        this.tail = current.prev;
        this.tail.next = null;
    } else {
        current.prev.next = current.next;
        current.next.prev = current.prev;

        current.prev = null;
        current.next = null;
    }

    this.length--;

    return current;
};

LinkList.prototype.find = function (value) {
    let current = this.head;

    while (current) {
        if (current.value === value) {
            return current;
        }
        current = current.next;
    }

    return null;
};

LinkList.prototype.move = function (value, markValue) {
    if (value === markValue) {
        return null;
    }

    let node = this.find(value), markNode = this.find(markValue);

    if (node === null || markNode === null) {
        return null;
    }

    if (node === this.head) {
        this.head = node.next;
        node.next.prev = null;
    } else if (node === this.tail) {
        this.tail = node.prev;
        node.prev.next = null;
    } else {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    if (markNode === this.tail) {
        this.tail = node;
        node.next = null;

        markNode.next = node;
        node.prev = markNode;
    } else {
        node.next = markNode.next;
        markNode.next.prev = node;

        markNode.next = node;
        node.prev = markNode;
    }
};

LinkList.prototype.reverse = function () {
    let current = this.head;

    while (current) {
        let next = current.next;

        current.next = current.prev;
        current.prev = next;

        current = next;
    }

    let tail = this.tail;
    this.tail = this.head;
    this.head = tail;
};

LinkList.prototype.traverse = function (fn) {
    let current = this.head;
    let index = 0;

    while (current) {
        fn.call(this, current.value, index, current);
        current = current.next;
        index++;
    }
};

LinkList.prototype.print = function () {
    this.traverse((value, index) => {
        console.log(`pos:${index}, value:${value}`);
    })
};

(function () {
    const linkList = new LinkList();
    linkList.append(1);
    linkList.append(2);
    linkList.append(3);
    console.log('1-2-3');
    linkList.print();

    linkList.appendAt(1, 11);
    console.log('1-11-2-3');
    linkList.print();

    linkList.remove(11);
    console.log('1-2-3');
    linkList.print();

    linkList.removeAt(1);
    console.log('1-3');
    linkList.print();

    console.log('linkNode value is 3');
    console.log(linkList.find(3));

    linkList.appendAt(1, 2);
    console.log('1-2-3');
    linkList.print();

    linkList.move(1, 3)
    console.log('2-3-1');
    linkList.print();

    linkList.move(1, 2)
    console.log('2-1-3');
    linkList.print();

    linkList.move(2, 1)
    console.log('1-2-3');
    linkList.print();

    linkList.reverse();
    console.log('3-2-1');
    linkList.print();
})();

// Singly Linked Node

function SinglyLinkNode(value) {
    this.value = value;
    this.next = null;
}
function SinglyLinkList() {
    this.head = new SinglyLinkNode();
}

SinglyLinkList.prototype.addNode = function (node) {
    let current = this.head;

    while (current.next !== null) {
        current = current.next;
    }

    current.next = node;
    return node;
};

SinglyLinkList.prototype.show = function () {
    let current = this.head.next;

    while (current) {
        console.log(current.value);
        current = current.next;
    }
};

// head->1->2->3
// c=1 next=2 1.next=null c=2 prev=1
// c=2 next=3 2.next=1 c=3 prev=2
// c=3 next=null 3.next=2 c=null prev=3
// head.next=prev
SinglyLinkList.prototype.reverse1 = function () {
    let current = this.head.next;
    let prev = null;
    while (current !== null) {
        let next = current.next;
        current.next = prev;

        prev = current;
        current = next;
    }

    this.head.next = prev
};

// head->1->2->3
// current = 1, next = 2, 1->3, 2->1, head > 2, head>2>1>3
// current = 1, next = 3, 1->null, 3->2, head>3, head>3>2>1>null
SinglyLinkList.prototype.reverse2 = function () {
    let current = this.head.next;
    while (current.next !== null) {
        let next = current.next;

        current.next = next.next;

        next.next = this.head.next;
        this.head.next = next;
    }
};

(function t2() {
    let sll = new SinglyLinkList();
    sll.addNode(new SinglyLinkNode(1));
    sll.addNode(new SinglyLinkNode(2));
    // sll.addNode(new SinglyLinkNode(3));

    console.log('origin:')
    sll.show();

    console.log('reversed:')
    sll.reverse2();
    sll.show();
})()