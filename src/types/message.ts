export interface SendMessageBody {
    token: string;
    event: string;
    eventBody: {
        targets: string[];
        msg: string;
    }
}

export interface MessageBody {
    source: {
        id: string;
        name: string;
        icon: string;
    };
    event: string;
    msg: string;
    timestamp: number;
}


export interface MsgBox {
    text: string
}