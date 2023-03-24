const testFunction = (callback) => {
    setTimeout(() => {
        callback('Hey!')
    }, 2000)
    
    setTimeout(() => {
        callback('Fa!')
    }, 0)

    setTimeout(() => {
        callback('Ku!')
    }, 1000)
}

/*testFunction((result) => {
    console.log(result)
})*/

const testPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hey!')
    }, 2000)

    setTimeout(() => {
        reject('Error!')
    }, 5000)
})

testPromise.then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})