process.on('exit', () => {
    console.log(`Worker: ${process.pid} finalizó`)
})

process.send('start')

process.on('message', ({ PORT }) => {
    console.log(`Proceso con Fork (Puerto): ${PORT} - Worker pid: ${process.pid}`)
})