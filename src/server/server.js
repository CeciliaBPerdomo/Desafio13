const child = require('child_process')
const cluster = require('cluster')
const { cpus } = require('os')

class Server {
    constructor(){}

    fork = (PORT, server => {
        try{
            const forked = child.fork('./src/server/fork.js')
            server
                .listen(PORT, () => {
                    forked.on('message', () => {
                        forked.send({ PORT })
                        console.log(`Servidor escuchando en el puerto ${server.address().port} - http://localhost:${PORT}`)
                    })
                    .on('error', error => { console.log('error al fork', error) })
                })
        } catch(err){ console.log(err) }
    })

    cluster = (PORT, server) => {
        const numCPUS = cpus().length
        if (cluster.isPrimary) {
            console.log('Número de clusters(procesadores) posibles:', numCPUS)
            console.log(`Master: ${process.pid} - inicializado.`)

            for (let i = 0; i < numCPUS; i++) { 
                cluster.fork()
            }

            cluster.on('exit', worker => {
                console.log('worker: ', worker.process.pid, ' caído. ', new Date().toLocaleString())
                cluster.fork()
            })
        } else {
            console.log(`Proceso Cluster. Puerto: ${PORT} - PID: ${process.pid}`)
            server
                .listen(PORT, () => {console.log(`Servidor escuchando en el puerto ${server.address().port} - http://localhost:${PORT}`)})
                .on('error', error => console.log(error))
        }
    }
}

module.exports = Server