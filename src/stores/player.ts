import { defineStore } from 'pinia';
import { PlayerState } from './interface/player';
import {Session} from '../utils/storage';

export const usePlayer = defineStore('player', {
    state: (): PlayerState => ({
        player: {
            audio: new Audio(),
            loopType: 0,
            volume: Session.get('player-colume') || 60,
            playList: [] as any,
            showPlayList: false,
            id: 0,
            url: '',
            songUrl: {} as any,
            song: {} as any,
            isPlaying: false,
            isPause: false,
            sliderInput: false,
            ended: false,
            muted: false,
            currentTime: 0,
            duration: 0
        }
    }),
    actions: {
        async play(id: number) {
            console.log(id);
        }
    }
})
