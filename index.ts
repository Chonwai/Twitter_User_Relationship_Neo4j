import CSV from './src/Services/CSVServices'
import BasicQuery from './src/Repository/Basic'
import Utils from './src/Utils/Utils'

async function insertUsers(row: any, friends: Array<string> = []) {
    let db: BasicQuery = new BasicQuery()
    await db.query(
        `
            CREATE (u:User {id: '${row.id}', name: '${row.screenName}', tags: '${row.tags}', avatar: '${row.avatar}', lang: '${row.lang}', lastSeen: '${row.lastSeen}', tweet_id: '${row.tweetId}'})
            RETURN u
        `
    )
}

async function insertFriendRelation(row: any, friends: Array<string> = []) {
    let db: BasicQuery = new BasicQuery()
    for (const i of friends) {
        await db.query(`
            MATCH (c:User), (f:User)
            WHERE c.id = '${row.id}' AND f.id = '${i}'
            CREATE (c)-[r1: is_friend]->(f)
            RETURN c, f
        `)
    }
}

async function main(): Promise<number> {
    let csv: CSV = new CSV()
    const AMOUNT: number = 20000
    let utils = new Utils()
    let res = await csv.readCSVtoJSON('./src/Data/TwitterData.csv')

    const newData: any = await utils.reduceData(res, AMOUNT, 0)

    // for await (const user of newData) {
    //     await insertUsers(user)
    // }

    for (let i: number = 0; i < AMOUNT; i++) {
        let findableFriends: Array<string> = []
        console.log(
            `Checking Users ${i + 1} with ${
                newData[i].friends.split('&').length
            }`
        )
        newData[i].friends.split('&').forEach((fd: string) => {
            newData.forEach((user: any) => {
                if (user.id == fd) {
                    findableFriends.push(fd)
                }
            })
        })
        console.log(findableFriends)
        await insertFriendRelation(newData[i], findableFriends)
    }
    console.log('Finished!')
    return 0
}

main()
