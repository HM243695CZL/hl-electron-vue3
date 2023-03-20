// 播放器
export interface PlayerState {
    player: {
        audio: HTMLAudioElement;
        loopType: number;
        volume: number;
        playList: Array<any>;
        showPlayList: boolean;
        id: number;
        url: string;
        songUrl: Object;
        song: Object;
        isPlaying: boolean;
        isPause: boolean;
        sliderInput: boolean;
        ended: boolean;
        muted: boolean;
        currentTime: number;
        duration: number;
    }
}
