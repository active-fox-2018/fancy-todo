function dateFormat(input) {
    if(!input) {
        return '-'
    } else {
        let splitDate = input.slice(0, 10).split('-')
        switch(splitDate[1]) {
          case '01': return `${splitDate[2] } Jan ${splitDate[0]}` ; break;
          case '02': return `${splitDate[2] } Feb ${splitDate[0]}` ; break;
          case '03': return `${splitDate[2] } Mar ${splitDate[0]}` ; break;
          case '04': return `${splitDate[2] } Apr ${splitDate[0]}` ; break;
          case '05': return `${splitDate[2] } May ${splitDate[0]}` ; break;
          case '06': return `${splitDate[2] } Jun ${splitDate[0]}` ; break;
          case '07': return `${splitDate[2] } Jul ${splitDate[0]}` ; break;
          case '08': return `${splitDate[2] } Aug ${splitDate[0]}` ; break;
          case '09': return `${splitDate[2] } Sep ${splitDate[0]}` ; break;
          case '10': return `${splitDate[2] } Oct ${splitDate[0]}` ; break;
          case '11': return `${splitDate[2] } Nov ${splitDate[0]}` ; break;
          case '12': return `${splitDate[2] } Des ${splitDate[0]}` ; break;
        }
    }
}