# Node.js 知识点

定义：在 V8 引擎之上构建的 JavaScript 运行环境

**源码版本: 12.6.0**

v12 更新（性能提升明显）：V8 引擎更新，TLS 更新，http 解析器更新为 llhttp

- [x] [runtime](runtime/index.md)

- [x] 模块

    模块种类：内置 C++ 模块、JavaScript 提供的 Native 模块

    Node.js 会把模块的代码包装在一个函数内再执行：
```javascript
// 1. 限制变量的作用域，不会暴露到 global 对象
// 2. 提供给模块类似于全局的对象
(function(exports, require, module, __filename, __dirname) {
// Module code actually lives in here
});
```

    require 实现原理：

`lib/internal/modules/cjs/loader.js`
```javascript
Module.prototype.require = function(id) {
    return Module._load(id, this, /* isMain */ false);
}

Module._load = function(request, parent, isMain) {
    const filename = Module._resolveFilename(request, parent, isMain);

    // 命中缓存，则直接返回缓存的 exports 对象
    const cachedModule = Module._cache[filename];
    if (cachedModule !== undefined) {
        updateChildren(parent, cachedModule, true);
        return cachedModule.exports;
    }

    // 命中原生模块
    const mod = NativeModule.map.get(filename);
    if (mod && mod.canBeRequiredByUsers) {
        return mod.compileForPublicLoader(experimentalModules);
    }

    // 创建新模块
    const module = new Module(filename, parent);

    // 保存在缓存中
    Module._cache[filename] = module;

    let threw = true;
    try {
        // 加载文件，编译执行
        module.load(filename);
        threw = false;
    } finally {
        if (threw) {
            delete Module._cache[filename];
        }
    }

    return module.exports;
}

Module.prototype.load = function(filename) {
    Module._extensions[extension](this, filename);
}

Module._extensions['.js'] = function(module, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  module._compile(stripBOM(content), filename);
};

Module.prototype._compile = function(content, filename) {
    compiledWrapper = compileFunction(
      content,
      filename,
      0,
      0,
      undefined,
      false,
      undefined,
      [],
      [
        'exports',
        'require',
        'module',
        '__filename',
        '__dirname',
      ]
    );

    result = compiledWrapper.call(thisValue, exports, require, module,
                                  filename, dirname);

    return result;
}
```

- [x] NPM 版本

- [x] KOA 模型

- [x] Profiling

* heapdump
* coredump
    
    ulimit -c unlimited
    node --abort-on-uncaught-exception index.js

    gcore

    lldb nod -c core.<pid>
