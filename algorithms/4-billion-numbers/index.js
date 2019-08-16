class BitMap {
    constructor(size) {
        this.arr = new Uint32Array(size)

        for (let i = 0; i < size; i++) {
            this.arr[i] = 0
        }
    }

    add(n) {
        let index = Math.floor(n / 32)
        let bitIndex = n % 32

        this.arr[index] = this.arr[index] | 1 << (bitIndex - 1)

        console.log(`bitIndex:${bitIndex}, index:${index}, value:${this.arr[index]}`)
    }

    isExist(n) {
        let index = Math.floor(n / 32)
        let bitIndex = n % 32
        let value = this.arr[index] & 1 << (bitIndex - 1)

        return value !== 0
    }
}

(function test() {
    let startTime = Date.now()
    const bitMap = new BitMap(Math.pow(2, 32) / 32)
    bitMap.add(1)
    bitMap.add(10)
    bitMap.add(100)
    bitMap.add(Math.pow(2, 32) - 1)
    console.log(`init cost ${Date.now() - startTime}ms`)

    console.log(bitMap.isExist(1))
    console.log(bitMap.isExist(2))
    console.log(bitMap.isExist(10))
    console.log(bitMap.isExist(20))
    console.log(bitMap.isExist(100))
    console.log(bitMap.isExist(200))

    startTime = Date.now()
    console.log(bitMap.isExist(Math.pow(2, 32) - 1))
    console.log(`check cost ${Date.now() - startTime}ms`)
})()