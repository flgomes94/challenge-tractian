const Status = (text: string): Array<string> => {
    switch (text) {
        case 'inAlert':
            return ['Em alerta', 'red'];
        case 'inOperation':
            return ['Em operação', 'green'];
        case 'inDowntime':
            return ['Em queda', 'orange'];
        default:
            return ['Sem estado definido', 'red'];
    }
};

export default Status;
