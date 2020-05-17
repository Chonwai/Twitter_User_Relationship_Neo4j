class Utils {
    public async reduceData(
        res: any,
        amount: number = 10000,
        position: number = 0
    ) {
        let newRes: Array<object> = []
        for (let index = position; index < position + amount; index++) {
            await newRes.push(res[index])
        }

        return newRes
    }
}

export default Utils
