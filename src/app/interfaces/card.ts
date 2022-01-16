export class CardOptions {
    icon: string;
    text: string;
    purpose: string;
    orientation: string;
    active: string;
    link: string;

    constructor() {
        this.icon = '';
        this.text = '';
        this.purpose = '';
        this.orientation = 'row';
        this.active = 'false';
        this.link = '/';
    }
}

export const Cards = [
    {
        icon: 'akar-desktop-device',
        text: 'Téléverser depuis mon appareil',
        purpose: 'STT',
        orientation: 'column',
        active: 'false',
        link: '/upload'

    }
];
