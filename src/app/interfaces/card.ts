export class CardOptions {
    icon: string;
    text: string;
    purpose: string;
    orientation: string;
    active: string;

    constructor() {
        this.icon = '';
        this.text = '';
        this.purpose = '';
        this.orientation = 'row';
        this.active = 'false';
    }
}

export const Cards = [
    {
        icon: 'akar-microphone',
        text: 'Enregistrer un audio',
        purpose: 'STT',
        orientation: 'column',
        active: 'false'
    },
    {
        icon: 'akar-desktop-device',
        text: 'Téléverser depuis mon appareil',
        purpose: 'STT',
        orientation: 'column',
        active: 'false'
    },
    {
        icon: 'akar-video',
        text: 'Entrer une URL YouTube',
        purpose: 'STT',
        orientation: 'column',
        active: 'false'
    },
    {
        icon: 'akar-sound-on',
        text: 'Choisir la voix par défaut ',
        purpose: 'TTS',
        orientation: 'row',
        active: 'false'
    },
    {
        icon: 'akar-search',
        text: 'Choisir une voix pré-enregistrée',
        purpose: 'TTS',
        orientation: 'row',
        active: 'false'
    },
    {
        icon: 'akar-plus',
        text: 'Choisir une voix un échantillon de voix depuis mon appareil ',
        purpose: 'TTS',
        orientation: 'row',
        active: 'false'
    },
];
