let token = []
const start = (char) => {
    if(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)) {
        token.push(char)
        return inNumber
    }
    if(['+', '-', '*', '/'].includes(char)) {
        emmitToken(char, char)
        return start
    }
    if(char === ' ') {
        return start
    }
    if(char === '\r' || char=== '\n') {
        return start
    }
}

const inNumber = (char) => {
    if(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)) {
        token.push(char)
        return inNumber
    } else {
        emmitToken("Number", token.join(''))
        token = []
        return start(char)
    }
}

function emmitToken(type:string, value:string) {
    console.log(value)
}

const input = '1024 + 2 * 256'

let state = start

for(let c of input.split('')) {
    state = state(c)
}

state(Symbol('EOF'))
