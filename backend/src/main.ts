import {start as startServer} from './web/server'




async function main() {
    startServer(3001)
}


main().catch(err => console.error(err))
