function LinkNode(value, key) {
    this.value = value;
    this.key = key;
    this.prev = null;
    this.next = null;
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.cache = {};

    this.head = new LinkNode();
    this.tail = new LinkNode();

    this.head.next = this.tail;
    this.tail.prev = this.head;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    let node = this.cache[key];

    if (!node) {
        return -1;
    }

    this.moveToHead(node);

    return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    let node = this.cache[key];

    if (node) {
        node.value = value;
        this.moveToHead(node);
    } else {
        node = new LinkNode(value, key);
        this.cache[key] = node;
        this.addNode(node);

        if (++this.size > this.capacity) {
            let tail = this.popTail();
            delete this.cache[tail.key];

            --this.size;
        }
    }
};

LRUCache.prototype.addNode = function (node) {
    node.prev = this.head;
    node.next = this.head.next;

    this.head.next.prev = node;
    this.head.next = node;
};

LRUCache.prototype.moveToHead = function (node) {
    this.remove(node);

    this.addNode(node);
};

LRUCache.prototype.popTail = function () {
    let node = this.tail.prev;

    this.remove(node);
    return node;
};

LRUCache.prototype.remove = function (node) {
    let prev = node.prev, next = node.next;

    prev.next = next;
    next.prev = prev;

    node.prev = null;
    node.next = null;
};

LRUCache.prototype.show = function (prefix) {
    let node = this.head.next;

    console.log(prefix);
    while (node) {
        if (node === this.tail) {
            return;
        }
        console.log(node.value);
        node = node.next;
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

(function test() {
    const cache = new LRUCache(2 /* 缓存容量 */);

    cache.put(1, 1);
    cache.show('[LRU] 1');
    cache.put(2, 2);
    cache.show('[LRU] 2-1');
    cache.get(1);       // 返回  1
    cache.show('[LRU] 1-2');
    cache.put(3, 3);    // 该操作会使得密钥 2 作废
    cache.show('[LRU] 3-1');
    cache.get(2);       // 返回 -1 (未找到)
    cache.show('[LRU] 3-1');
    cache.put(4, 4);    // 该操作会使得密钥 1 作废
    cache.show('[LRU] 4-3');
    cache.get(1);       // 返回 -1 (未找到)
    cache.show('[LRU] 4-3');
    cache.get(3);       // 返回  3
    cache.show('[LRU] 3-4');
    cache.get(4);       // 返回  4。
    cache.show('[LRU] 4-3');
})()