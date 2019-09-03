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

// 5,2,3,6,4,1
Sort.prototype.quickSort = function (list) {
    let length = list.length;
    let left = Math.floor(length / 2);
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
    sort.quickSort(list.slice());
})();