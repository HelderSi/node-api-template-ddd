import addModule from './addModule'


const action = process.argv[2];
const target = process.argv[3];


const cmds = {
    'add': {
        'module': addModule,
        'provider': () => {}
    }
}

const targetCmd = cmds[action][target]

if(!targetCmd) {
    console.log('command not found')
    process.exit(1)
} else{
    targetCmd.execute(process.argv.slice(4))
}