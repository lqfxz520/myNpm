const reg:RegExp = /(YY(?:YY)?|M{2,2}|D{1,2}|d{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|S{1,3})/g

function formateTime(timeStamp:(string | Date | number), template:string = 'YYYY-MM-DD') {
    const dateObj:Date = new Date(timeStamp)
    const translation = template.replace(reg, function (match) {
        // console.log(match)
        let temp = String(translateCase(match, dateObj))
        // 位数解决， 情况一：要求长度少于实际长度, 情况二：要求长度大于实际长度
        const len = match.length - temp.length
        if (len > 0) {
            let str = ''
            for (let i = 0; i < len; i++) str += '0'
            temp = str + temp
        } else if (len < 0 && match.includes('Y')) {
            temp = temp.slice(len)
        }
        return temp
    })

    return translation
}

function translateCase(s:string, dateObj:Date) {
    let timeValue:number|string
    switch (s) {
        case 'YY':
        case 'YYYY':
            timeValue = dateObj.getFullYear()
            break
        case 'M':
        case 'MM':
            timeValue = dateObj.getMonth() + 1
            break
        case 'D':
        case 'DD':
            timeValue = dateObj.getDate()
            break
        case 'd':
        case 'dd':
            timeValue = dateObj.getDay()
            break
        case 'H':
        case 'HH':
            timeValue = dateObj.getHours()
            break
        case 'h':
        case 'hh':
            const hours = dateObj.getHours()
            timeValue = hours > 12 ? hours - 12 : hours
            break
        case 'm':
        case 'mm':
            timeValue = dateObj.getMinutes()
            break
        case 'S':
        case 'SS':
        case 'SSS':
            timeValue = dateObj.getMilliseconds()
            break
        case 's':
        case 'ss':
            timeValue = dateObj.getSeconds()
            break
        default:
            timeValue = s
    }
    return timeValue
}

/**
 * resolve url like ?a=b&c=d
 * translate Json.
 **/
function translateUrl(url:string) {
    const re = /(?=[^?&#])(\w*)=([^?&#]*)/g
    const obj = {}
//    url.replace(re, function (match, p1, p2) {
//        obj[p1] = p2
//    })
    let arr:Array<string>
    while( (arr = re.exec(url)) != null ) {
        obj[arr[1]] = arr[2]
    }

    return obj
}
export { formateTime, translateUrl }

