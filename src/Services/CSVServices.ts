import fs from 'fs'
import * as CSVWriter from 'csv-writer'
import CSVtoJSON from 'csvtojson'

class CSVServices {
    private csvWriter: any
    constructor() {
        this.csvWriter = CSVWriter.createObjectCsvWriter({
            path: 'src/Data/TwitterDataset.csv',
            header: [
                { id: 'id', title: 'id' },
                { id: 'screenName', title: 'screenName' },
                { id: 'tags', title: 'tags' },
                { id: 'avatar', title: 'avatar' },
                { id: 'followersCount', title: 'followersCount' },
                { id: 'friendsCount', title: 'friendsCount' },
                { id: 'lang', title: 'lang' },
                { id: 'lastSeen', title: 'lastSeen' },
                { id: 'tweetId', title: 'tweetId' },
                { id: 'friends', title: 'friends' },
            ],
        })
    }
    public async readCSVtoJSON(path: string): Promise<any[string]> {
        let file: any = await CSVtoJSON().fromFile(path)
        return file
    }

    public async readStream(path: string): Promise<any[string]> {
        const readStream = await fs.createReadStream(path)
        readStream.pipe(CSVtoJSON())
        return readStream
    }

    public async writeCSV(data: any): Promise<void> {
        await this.csvWriter.writeRecords(data).then(() => {
            console.log('Done!')
        })
    }

    public async updateCSVObject(object: object) {
        this.csvWriter = object
    }
}

export default CSVServices
