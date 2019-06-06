module.exports = progress = {
    upload: (() => {
        const path = '·························'
        const earth = ['🌏', '🌍', '🌎']
        const home = '🏡'
        const payload = '📦'
        let earthFrame = 0

        return percentage => {
            const payloadPos = Math.ceil(path.length * (percentage / 100)) - 1
            const newPath = path.substr(0, payloadPos) + payload + ' ' + path.substr(payloadPos + 1)

            earthFrame = earthFrame === 2 ? 0 : earthFrame + 1

            const padLength = 3 - percentage.toString().length
            let pad = ''

            for (let i = 0; i < padLength + 2; i++) {
                pad += '\u00A0'
            }

            return home + '  ' + newPath + ' ' + earth[earthFrame] + pad + percentage + '%'
        }
    })()
}