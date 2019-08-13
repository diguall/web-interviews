const root = {
    key: 1,
    left: {
        key: 2,
        left: {
            key: 4,
            left: {
                key: 6
            }
        },
        right: {
            key: 5
        }
    },
    right: {
        key: 3,
        left: {
            key: 7
        },
        right: {
            key: 8
        }
    }
}

// 先序遍历
function DFS_BT_DLR(root) {
    let stack = [root];
    let result = [];

    while (stack.length) {
        let current = stack.pop();

        result.push(current.key);

        if (current.right) {
            stack.push(current.right);
        }

        if (current.left) {
            stack.push(current.left);
        }
    }

    return result;
}

// 中序遍历
function DFS_BT_LDR(root) {
    let stack = [];
    let result = [];

    while (stack.length || root) {
        if (root) {
            stack.push(root);
            root = root.left;
        } else {
            root = stack.pop();
            result.push(root.key);

            root = root.right;
        }
    }

    return result;
}

// 后序遍历
function DFS_BT_LRD(root) {
    let stack = [root];
    let result = [];

    while (stack.length) {
        if (root.left && !root.touched) {
            root.touched = 'left';
            root = root.left;
            stack.push(root);
            continue;
        }
        if (root.right && root.touched != 'right') {
            root.touched = 'right';
            root = root.right;
            stack.push(root);
            continue;
        }
        root = stack.pop();
        root.touched && delete root.touched;
        result.push(root.key);
        root = stack.length ? stack[stack.length - 1] : null;
    }

    return result;
}

function BFS(root) {
    let stack = [root];
    let result = [];

    while (stack.length) {
        let current = stack.shift();
        result.push(current.key);

        if (current.left) {
            stack.push(current.left);
        }

        if (current.right) {
            stack.push(current.right);
        }
    }

    return result;
}

console.log(DFS_BT_DLR(root));
console.log(DFS_BT_LDR(root));
console.log(DFS_BT_LRD(root));
console.log(BFS(root));

const tree = {
    value: 0,
    children: [{
        value: 11,
        children: [{
            value: 21,
            children: [{
                value: 31,
                children: []
            }, {
                value: 32,
                children: []
            }, {
                value: 33,
                children: []
            }]
        }, {
            value: 22,
            children: []
        }]
    }, {
        value: 12,
        children: [{
            value: 23,
            children: []
        }, {
            value: 24,
            children: []
        }]
    }, {
        value: 13,
        children: []
    }]
}

function recursiveLoop(root) {
    if(!root || !root.children) {
        return;
    }

    
}