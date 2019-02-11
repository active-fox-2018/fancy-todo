
function dateConv(input) {
    input = String(input)
    let array = input.split('-')
    switch (array[1]) {
        case '01':
            array[1] = 'Januari'
        case '02':
            array[1] = 'Februari'
            break;
        case '03':
            array[1] = 'Maret'
            break;
        case '04':
            array[1] = 'April'
            break;
        case '05':
            array[1] = 'Mei'
            break;
        case '06':
            array[1] = 'Juni'
            break;
        case '07':
            array[1] = 'Juli'
            break;
        case '08':
            array[1] = 'Agustus'
            break;
        case '09':
            array[1] = 'September'
            break;
        case '10':
            array[1] = 'Oktober'
            break;
        case '11':
            array[1] = 'November'
            break;
        case '12':
            array[1] = 'Desember'
            break;
    }

    let tanggal = array[2]

    return `${tanggal} ${array[1]} ${array[0]}`
}

module.exports = dateConv