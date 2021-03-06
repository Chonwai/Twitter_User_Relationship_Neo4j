'use strict'
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ?
                value :
                new P(function (resolve) {
                    resolve(value)
                })
        }
        return new(P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }

            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }

            function step(result) {
                result.done ?
                    resolve(result.value) :
                    adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1]
                    return t[1]
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g
        return (
            (g = {
                next: verb(0),
                throw: verb(1),
                return: verb(2)
            }),
            typeof Symbol === 'function' &&
            (g[Symbol.iterator] = function () {
                return this
            }),
            g
        )

        function verb(n) {
            return function (v) {
                return step([n, v])
            }
        }

        function step(op) {
            if (f) throw new TypeError('Generator is already executing.')
            while (_)
                try {
                    if (
                        ((f = 1),
                            y &&
                            (t =
                                op[0] & 2 ?
                                y['return'] :
                                op[0] ?
                                y['throw'] ||
                                ((t = y['return']) && t.call(y), 0) :
                                y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t
                    if (((y = 0), t)) op = [op[0] & 2, t.value]
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op
                            break
                        case 4:
                            _.label++
                            return {
                                value: op[1], done: false
                            }
                            case 5:
                                _.label++
                                y = op[1]
                                op = [0]
                                continue
                            case 7:
                                op = _.ops.pop()
                                _.trys.pop()
                                continue
                            default:
                                if (
                                    !((t = _.trys),
                                        (t = t.length > 0 && t[t.length - 1])) &&
                                    (op[0] === 6 || op[0] === 2)
                                ) {
                                    _ = 0
                                    continue
                                }
                                if (
                                    op[0] === 3 &&
                                    (!t || (op[1] > t[0] && op[1] < t[3]))
                                ) {
                                    _.label = op[1]
                                    break
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1]
                                    t = op
                                    break
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2]
                                    _.ops.push(op)
                                    break
                                }
                                if (t[2]) _.ops.pop()
                                _.trys.pop()
                                continue
                    }
                    op = body.call(thisArg, _)
                } catch (e) {
                    op = [6, e]
                    y = 0
                } finally {
                    f = t = 0
                }
            if (op[0] & 5) throw op[1]
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            }
        }
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : {
            default: mod
        }
    }
Object.defineProperty(exports, '__esModule', {
    value: true
})
var CSVServices_1 = __importDefault(require('./src/Services/CSVServices'))
var Basic_1 = __importDefault(require('./src/Repository/Basic'))
var Utils_1 = __importDefault(require('./src/Utils/Utils'))

function insertUsers(row, friends) {
    if (friends === void 0) {
        friends = []
    }
    return __awaiter(this, void 0, void 0, function () {
        var db
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = new Basic_1.default()
                    return [
                        4 /*yield*/ ,
                        db.query(
                            "\n            CREATE (u:User {id: '" +
                            row.id +
                            "', name: '" +
                            row.screenName +
                            "', tags: '" +
                            row.tags +
                            "', avatar: '" +
                            row.avatar +
                            "', lang: '" +
                            row.lang +
                            "', lastSeen: '" +
                            row.lastSeen +
                            "', tweet_id: '" +
                            row.tweetId +
                            "'})\n            RETURN u\n        "
                        ),
                    ]
                case 1:
                    _a.sent()
                    return [2 /*return*/ ]
            }
        })
    })
}

function insertFriendRelation(row, friends) {
    if (friends === void 0) {
        friends = []
    }
    return __awaiter(this, void 0, void 0, function () {
        var db, _i, friends_1, i
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = new Basic_1.default();
                    (_i = 0), (friends_1 = friends)
                    _a.label = 1
                case 1:
                    if (!(_i < friends_1.length)) return [3 /*break*/ , 4]
                    i = friends_1[_i]
                    return [
                        4 /*yield*/ ,
                        db.query(
                            "\n            MATCH (c:User), (f:User)\n            WHERE c.id = '" +
                            row.id +
                            "' AND f.id = '" +
                            i +
                            "'\n            CREATE (c)-[r1: is_friend]->(f)\n            RETURN c, f\n        "
                        ),
                    ]
                case 2:
                    _a.sent()
                    _a.label = 3
                case 3:
                    _i++
                    return [3 /*break*/ , 1]
                case 4:
                    return [2 /*return*/ ]
            }
        })
    })
}

function main() {
    return __awaiter(this, void 0, void 0, function () {
        var csv, AMOUNT, utils, res, newData, _loop_1, i
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    csv = new CSVServices_1.default()
                    AMOUNT = 20000
                    utils = new Utils_1.default()
                    return [
                        4 /*yield*/ ,
                        csv.readCSVtoJSON('./src/Data/TwitterData.csv'),
                    ]
                case 1:
                    res = _a.sent()
                    return [
                        4 /*yield*/ ,
                        utils.reduceData(res, AMOUNT, 0),
                        // for await (const user of newData) {
                        //     await insertUsers(user)
                        // }
                    ]
                case 2:
                    newData = _a.sent()
                    _loop_1 = function (i) {
                        var findableFriends
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    findableFriends = []
                                    console.log(
                                        'Checking Users ' +
                                        (i + 1) +
                                        ' with ' +
                                        newData[i].friends.split('&').length
                                    )
                                    newData[i].friends
                                        .split('&')
                                        .forEach(function (fd) {
                                            newData.forEach(function (user) {
                                                if (user.id == fd) {
                                                    findableFriends.push(fd)
                                                }
                                            })
                                        })
                                    console.log(findableFriends)
                                    return [
                                        4 /*yield*/ ,
                                        insertFriendRelation(
                                            newData[i],
                                            findableFriends
                                        ),
                                    ]
                                case 1:
                                    _a.sent()
                                    return [2 /*return*/ ]
                            }
                        })
                    }
                    i = 0
                    _a.label = 3
                case 3:
                    if (!(i < AMOUNT)) return [3 /*break*/ , 6]
                    return [5 /*yield**/ , _loop_1(i)]
                case 4:
                    _a.sent()
                    _a.label = 5
                case 5:
                    i++
                    return [3 /*break*/ , 3]
                case 6:
                    console.log('Finished!')
                    return [2 /*return*/ , 0]
            }
        })
    })
}
main()