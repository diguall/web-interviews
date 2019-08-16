class LeafNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(leafNode) {
        this.children.push(leafNode);
    }
}

class Tree {
    constructor(root) {
        this.root = root;
    }

    _recursiveDepthFirstSearch(root) {
        if (!root || !root.children) {
            return;
        }
        let result = [];
        result.push(root.value);

        root.children.forEach((item) => {
            result = result.concat(this._recursiveDepthFirstSearch(item));
        });

        return result;
    }

    _norecursiveDepthFirstSearch(root) {
        if (!root || !root.children) {
            return;
        }

        let result = [], stack = [root];

        while (stack.length) {
            let currentNode = stack.shift();
            result.push(currentNode.value);

            if (currentNode.children.length) {
                stack = currentNode.children.concat(stack);
            }
        }

        return result;
    }

    _recursiveBreadthFirstSearch(root) {
        if (!root || !root.children) {
            return;
        }

        function recursiveNodes(nodes) {
            let result = [];
            let items = [];
            nodes.forEach((item) => {
                result.push(item.value);
                items = items.concat(item.children);
            });

            if (items.length > 0) {
                result = result.concat(recursiveNodes(items));
            }

            return result;
        }

        return recursiveNodes([root]);
    }

    _norecursiveBreadthFirstSearch(root) {
        if (!root || !root.children) {
            return;
        }

        let result = [], stack = [root];

        while (stack.length) {
            let currentNode = stack.shift();
            result.push(currentNode.value);

            if (currentNode.children.length) {
                stack = stack.concat(currentNode.children);
            }
        }

        return result;
    }

    recursiveDfs() {
        return this._recursiveDepthFirstSearch(this.root);
    }

    dfs() {
        return this._norecursiveDepthFirstSearch(this.root);
    }

    recursiveBfs() {
        return this._recursiveBreadthFirstSearch(this.root);
    }

    bfs() {
        return this._norecursiveBreadthFirstSearch(this.root);
    }
}

class BinaryLeafNode {
    constructor(value) {
        this.value = value;
    }

    addLeftChild(leafNode) {
        this.left = leafNode;
    }

    addRightChild(leafNode) {
        this.right = leafNode;
    }
}

class BinaryTree {
    constructor(root) {
        this.root = root;
    }

    _norecursiveBreadthFirstSearch(root) {
        if (!root) {
            return;
        }

        let result = [], stack = [root];

        while (stack.length) {
            let current = stack.shift();
            result.push(current.value);

            if (current.left) {
                stack.push(current.left);
            }
            if (current.right) {
                stack.push(current.right);
            }
        }

        return result;
    }

    _norecursivePreorderDepthFirstSearch(root) {
        if (!root) {
            return;
        }

        let result = [], stack = [root];

        while (stack.length) {
            let current = stack.pop();
            result.push(current.value);

            if (current.right) {
                stack.push(current.right);
            }

            if (current.left) {
                stack.push(current.left);
            }
        }

        return result;
    }

    _norecursiveInorderDepthFirstSearch(root) {
        if (!root) {
            return;
        }

        let result = [], stack = [];
        let current = root;

        while (stack.length || current) {
            if (current) {
                stack.push(current);
                current = current.left;
            } else {
                current = stack.pop();
                result.push(current.value);

                current = current.right;
            }
        }

        return result;
    }

    _norecursivePostorderDepthFirstSearch(root) {
        if (!root) {
            return;
        }
        let stack = [];
        let result = [];
        let lastVisitedNode;
        let current = root;

        while (stack.length || current) {
            if (current) {
                stack.push(current);
                current = current.left;
            } else {
                let topNode = stack[stack.length - 1];

                if (topNode.right && topNode.right !== lastVisitedNode) {
                    current = topNode.right;
                } else {
                    lastVisitedNode = stack.pop();
                    result.push(lastVisitedNode.value);
                }
            }
        }

        return result;
    }


    _recursivePreorderDepthFirstSearch(root) {
        if (!root) {
            return;
        }

        let result = [];

        result.push(root.value);

        if (root.left) {
            result = result.concat(this._recursivePreorderDepthFirstSearch(root.left));
        }

        if (root.right) {
            result = result.concat(this._recursivePreorderDepthFirstSearch(root.right));
        }

        return result;
    }

    _recursiveInorderDepthFirstSearch(root) {
        if (!root) {
            return;
        }

        let result = [];

        if (root.left) {
            result = result.concat(this._recursiveInorderDepthFirstSearch(root.left));
        }

        result.push(root.value);

        if (root.right) {
            result = result.concat(this._recursiveInorderDepthFirstSearch(root.right));
        }

        return result;
    }

    _recursivePostorderDepthFirstSearch(root) {
        if (!root) {
            return;
        }

        let result = [];

        if (root.left) {
            result = result.concat(this._recursivePostorderDepthFirstSearch(root.left));
        }

        if (root.right) {
            result = result.concat(this._recursivePostorderDepthFirstSearch(root.right));
        }

        result.push(root.value);

        return result;
    }

    bfs() {
        return this._norecursiveBreadthFirstSearch(this.root);
    }

    dfsDLR() {
        return this._norecursivePreorderDepthFirstSearch(this.root);
    }

    dfsLDR() {
        return this._norecursiveInorderDepthFirstSearch(this.root);
    }

    dfsLRD() {
        return this._norecursivePostorderDepthFirstSearch(this.root);
    }

    recursiveDfsDLR() {
        return this._recursivePreorderDepthFirstSearch(this.root);
    }

    recursiveDfsLDR() {
        return this._recursiveInorderDepthFirstSearch(this.root);
    }

    recursiveDfsLRD() {
        return this._recursivePostorderDepthFirstSearch(this.root);
    }
}

// testcase
const rawData = {
    value: "11",
    children: [
        {
            value: "21",
            children: [
                {
                    value: "31",
                    children: []
                }
            ]
        },
        {
            value: "22",
            children: [
                {
                    value: "32",
                    children: [
                        {
                            value: "41",
                            children: []
                        }
                    ]
                },
                {
                    value: "33",
                    children: []
                }
            ]
        },
        {
            value: "23",
            children: [
                {
                    value: "34",
                    children: []
                }
            ]
        }
    ]
};

(function testTree(data) {
    function convertLeafNodes(root) {
        const leafNode = new LeafNode(root.value);
        root.children.forEach((item) => {
            leafNode.addChild(convertLeafNodes(item));
        });

        return leafNode;
    }

    const tree = new Tree(convertLeafNodes(data));

    console.log('>>>>>>tree traversal<<<<<<')
    console.log(`recursive dfs:\n ${tree.recursiveDfs()}`);
    console.log(`dfs:\n ${tree.dfs()}`);

    console.log(`recursive bfs:\n ${tree.recursiveBfs()}`);
    console.log(`bfs:\n ${tree.bfs()}`);
    console.log('>>>>>>tree traversal<<<<<<\n')
})(rawData);

// testcase for binary tree
const binaryRawData = {
    value: "F",
    left: {
        value: "B",
        left: {
            value: "A"
        },
        right: {
            value: "D",
            left: {
                value: "C"
            },
            right: {
                value: "E"
            }
        }
    },
    right: {
        value: "G",
        right: {
            value: "I",
            left: {
                value: "H"
            }
        }
    }
};

(function testBinaryTree(data) {
    function convertBinaryLeafNodes(root) {
        const binaryLeafNode = new BinaryLeafNode(root.value);
        if (root.left) {
            binaryLeafNode.addLeftChild(convertBinaryLeafNodes(root.left));
        }
        if (root.right) {
            binaryLeafNode.addRightChild(convertBinaryLeafNodes(root.right));
        }

        return binaryLeafNode;
    }

    const binaryTree = new BinaryTree(convertBinaryLeafNodes(data));

    // console.log(`binary tree recursive dfs: ${binaryTree.recursiveDfsDlr()}`);
    // console.log(`binary tree dfs use dlr: ${binaryTree.dfsDlr()}`);

    console.log('>>>>>>binary tree traversal<<<<<<')
    console.log(`bfs:\n ${binaryTree.bfs()}`);

    console.log(`recursive dfs dlr:\n ${binaryTree.recursiveDfsDLR()}`);
    console.log(`recursive dfs ldr:\n ${binaryTree.recursiveDfsLDR()}`);
    console.log(`recursive dfs lrd:\n ${binaryTree.recursiveDfsLRD()}`);

    console.log(`dfs dlr:\n ${binaryTree.dfsDLR()}`);
    console.log(`dfs ldr:\n ${binaryTree.dfsLDR()}`);
    console.log(`dfs lrd:\n ${binaryTree.dfsLRD()}`);


    console.log('>>>>>>binary tree traversal<<<<<<\n')
})(binaryRawData);