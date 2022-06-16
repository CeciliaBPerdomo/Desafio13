# Desafio13
Servidor con balance de carga

# Comandos
node server.js -p 8081
node server.js -p 8081 -m fork

forever start index.js -p 8082 -p cluster

pm2 start index.js --name --watch -- -p 8083
pm2 start index.js --name --watch -- -p 8084 -m cluster

node index.js
node index.js -p 8081 -m cluster
