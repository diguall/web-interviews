function Sort() {

}

// 遍历对每两个元素进比较，较大的交换到后面，每次循环可以把最大的数放在末尾
// 5,2,3,6,4,1  
// i=0,j=0  2,5,3,6,4,1
// i=0,j=1  2,3,5,6,4,1  
// i=0,j=2  2,3,5,6,4,1
// i=0,j=3  2,3,5,4,6,1  
// i=0,j=4  2,3,5,4,1,6

// i=1,j=0  2,3,5,4,1,6
// i=1,j=1  2,3,5,4,1,6
// i=1,j=2  2,3,4,5,1,6
// i=1,j=3  2,3,4,1,5,6

// i=2,j=0  2,3,4,1,5,6
// i=2,j=1  2,3,4,1,5,6
// i=2,j=2  2,3,1,4,5,6

// i=3,j=0  2,3,1,4,5,6
// i=3,j=1  2,1,3,4,5,6

// i=4,j=0  1,2,3,4,5,6
Sort.prototype.bubbleSort = function (list) {
    console.log("[bubble sort] origin:", list);

    let length = list.length;

    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (list[j] > list[j + 1]) {
                let tmp = list[j + 1];
                list[j + 1] = list[j];
                list[j] = tmp;
            }
            console.log(`[bubble sort]:i=${i},j=${j}`, list);
        }
    }

    console.log("[bubble sort] result:", list);

    return list;
};

// 选定第一个元素作为初始元素，遍历剩余元素，找到最小值及序号，若初始元素大于最小值则交换，每次循环可以把最小值放在前序已排序序列末尾
// 5,2,3,6,4,1
// i=0,minIndex=5   1,2,3,6,4,5
// i=1,minIndex=1   1,2,3,6,4,5
// i=2,minIndex=2   1,2,3,6,4,5
// i=3,minIndex=4   1,2,3,4,6,5
// i=4,minIndex=5   1,2,3,4,5,6
Sort.prototype.selectSort = function (list) {
    console.log("[select sort] origin:", list);

    let length = list.length;

    for (let i = 0; i < length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < length; j++) {
            if (list[j] < list[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex > i) {
            let temp = list[minIndex];
            list[minIndex] = list[i];
            list[i] = temp;
        }
        console.log(`[select sort]:i=${i},minIndex:${minIndex}`, list);
    }

    console.log("[select sort] result:", list);

    return list;
};

// 选定第一个元素作为有序序列，从第一个元素之后开始遍历，当前元素与有序序列从末尾向前遍历比较，若当前元素小于有序序列当前元素，有序序列向后移一位，一直到找到插入的序号，再进行赋值
// 5,2,3,6,4,1
// i=1  2,5|3,6,4,1
// i=2  2,3,5|6,4,1
// i=3  2,3,5,6|4,1
// i=4  2,3,4,5,6|1
// i=5  1,2,3,4,5,6
Sort.prototype.insertSort = function (list) {
    console.log("[insert sort] origin:", list);

    let length = list.length;
    for (let i = 1; i < length; i++) {
        let prevIndex = i - 1;
        let current = list[i];

        while (prevIndex >= 0 && list[prevIndex] > current) {
            list[prevIndex + 1] = list[prevIndex];
            prevIndex--;
        }
        list[prevIndex + 1] = current;
        console.log(`[insert sort]:i=${i},prevIndex:${prevIndex}`, list);
    }

    console.log("[insert sort] result:", list);
    return list;
};

// 按照 gap 对序列分组，每个组单独进行插入排序，完成后减小 gap 再次遍历
// 5,2,3,6,4,1
// gap=3    5,2,1,6,4,3
// gap=1    1,2,3,4,5,6
Sort.prototype.shellSort = function (list) {
    console.log("[shell sort] origin:", list);
    let length = list.length;

    for (let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < length; i++) {
            let inserted = list[i];
            let j = i;

            while (j - gap >= 0 && inserted < list[j - gap]) {
                list[j] = list[j - gap];
                j = j - gap;
            }

            list[j] = inserted;
        }

        console.log(`[shell sort]:gap=${gap}`, list);
    }

    console.log("[shell sort] result:", list);

    return list;
};

Sort.prototype._merge = function (left, right) {
    console.log("[merge sort] merge left:", left, " right:", right);

    let result = [];

    while (left.length > 0 && right.length > 0) {
        if (left[0] <= right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }

    while (left.length > 0) {
        result.push(left.shift());
    }

    while (right.length > 0) {
        result.push(right.shift());
    }

    console.log("[merge sort] merged:", result);

    return result;
};

// 分治法，序列拆分为更小的子序列，递归合并子序列并使子序列有序
// 5,2,3,6,4,1
// 5,2,3  6,4,1
// 5  2,3  6  4,1
// 5  2  3  6  4  1
// 5  2,3  6  1,4
// 2,3,5  1,4,6
// 1,2,3,4,5,6
Sort.prototype.mergeSort = function (list) {
    console.log("[merge sort] origin:", list);

    let length = list.length;
    if (length < 2) {
        return list;
    }
    let left = list.slice(0, Math.floor(length / 2))
    let right = list.slice(Math.floor(length / 2));

    return this._merge(this.mergeSort(left), this.mergeSort(right));
};

Sort.prototype._swap = function (list, i, j) {
    if (i === j) {
        return;
    }

    let temp = list[i];
    list[i] = list[j];
    list[j] = temp;
}


// 选择任意一个数据作为 pivot，遍历序列将小于 pivot 的放在左边，大于 pivot 的放在右边，按照 pivot 的序号切分为两个区间，再递归至区间缩小为 1
// 6, 11, 3, 9, 8
// pivot=8 i=0,index=0  6,11,3,9,8
// pivot=8 i=2,index=1  6,3,11,9,8
// pivot=8 i=4,index=2  6,3,8,9,11
// pivot index 2
Sort.prototype._partition = function (list, left, right) {
    console.log(`[quick sort] partition left:${left}, right:${right}, origin:`, list);
    let pivot = list[right];
    let index = left;
    for (let i = left; i < right; i++) {
        if (list[i] < pivot) {
            this._swap(list, i, index);
            console.log(`[quick sort] swap i:${i},index:${index},list:`, list);
            index++;
        }
    }
    this._swap(list, index, right);
    console.log(`[quick sort] partition index:${index}, result:`, list);

    return index;
};

Sort.prototype.quickSort = function (list, left, right) {
    left = Number.isInteger(left) ? left : 0;
    right = Number.isInteger(right) ? right : list.length - 1;
    console.log(`[quick sort] left:${left},right:${right}`);

    if (left >= right) {
        return list;
    }

    let index = this._partition(list, left, right);
    this.quickSort(list, left, index - 1);
    this.quickSort(list, index + 1, right);

    return list;
};

// 堆是一个完全二叉树，除了最后一层外其它层的节点都是满的，最后一层都靠左排列，堆中每个节点的值都必须大于等于（或小于等于）子树每个节点的值
// 大顶堆：[7, 5, 6, 4, 2, 1]
//         0  1  2  3  4  5
/**
 *         7
 *       /    \
 *      5      6
 *     / \    /
 *    4   2  1
 */
// 下标 i 的左子节点为 i*2 + 1，右子节点为 i*2+2，父节点为 i/2

// [1, 2, 4, 5, 6, 7]
Sort.prototype.heapSort = function (list) {
    const self = this;
    let length = list.length;

    function buildHeap(arr) {
        length = arr.length;
        for (let i = Math.floor(length / 2); i >= 0; i--) {
            heapify(arr, i);
        }
    }

    function heapify(arr, i) {
        let maxIndex = i;
        let left = i * 2 + 1, right = i * 2 + 2;
        if (left < length && arr[maxIndex] < arr[left]) {
            maxIndex = left;
        }

        if (right < length && arr[maxIndex] < arr[right]) {
            maxIndex = right;
        }

        if (maxIndex === i) {
            return;
        }

        self._swap(arr, maxIndex, i);
        heapify(arr, maxIndex);
    }

    console.log("[heap sort] origin:", list);

    buildHeap(list);
    console.log("[heap sort] build:", list);

    while (length > 0) {
        self._swap(list, 0, length - 1);
        --length;
        heapify(list, 0);
    }

    console.log("[heap sort] result:", list);

    return list;
};

(function test() {
    let list = [5, 2, 3, 6, 4, 1];
    let sort = new Sort();

    // 时间复杂度：O(n^2) 空间复杂度：O(1) 稳定
    // sort.bubbleSort(list.slice());

    // 时间复杂度：O(n^2) 空间复杂度：O(1) 非稳定
    // sort.selectSort(list.slice());

    // 时间复杂度：O(n^2) 空间复杂度：O(1) 稳定
    // sort.insertSort(list.slice());

    // 时间复杂度：O(n^1.3) ~ O(n^2) 空间复杂度：O(1) 非稳定
    // sort.shellSort(list.slice());

    // 时间复杂度：O(nlogn) 稳定
    // sort.mergeSort(list.slice());

    // 时间复杂度：O(nlogn) 不稳定
    // sort.quickSort(list.slice());
    // sort.quickSort([6, 11, 3, 9, 8]);

    // 时间复杂度：O(nlogn) 不稳定
    sort.heapSort(list.slice());
})();