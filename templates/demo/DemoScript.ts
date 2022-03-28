
import { _decorator, Label, Component, game, log, AudioSource } from 'cc';
import { CCPokiSDK } from '../poki-api/PokiPlatform';
import SiteLock from '../poki-api/SiteLock.js'

const { ccclass, property } = _decorator;

@ccclass('DemoScript')
export class DemoScript extends Component {

    @property({type:Label})
    outputLabel: Label

    audioSource:AudioSource = null

    start () {

        //Trigger the sitelock to prevent users from playing on other websites. 
        SiteLock.init()

        game.on(CCPokiSDK.EVENT_REWARD_BREAK_DONE, this.onRewardBreakDone, this)
        game.on(CCPokiSDK.EVENT_COMMERCIAL_BREAK_DONE, this.onCommercialBreakDone, this)
        game.on(CCPokiSDK.EVENT_SHRABLE_URL_READY, this.onSharableLinkReady, this)

        this.audioSource = this.getComponent(AudioSource)
    }

    onShareableLinkClicked(evnt){
        CCPokiSDK.shareableURL({"difficulty":"easy", "lives":3})
    }

    onSharableLinkReady(){
        const url = arguments[0]
        log("SharableURL:", url)
        this.outputLabel.string = url
    }

    onRewardBreakClicked(evnt){
        //pause the game music.
        this.audioSource.pause()
        CCPokiSDK.gameplayStop()
        CCPokiSDK.rewardBreak()
    }

    onRewardBreakDone(){
        let success = arguments[0]
        if(success){
            this.outputLabel.string = "Reward video success."
            log("Revive Player")
            CCPokiSDK.gameplayStart()
        }else{
            log("Game End Screen")
        }

        //resume playing the background music.
        this.audioSource.play()
    }

    onCommercialBreakClicked(evnt){
        //pause the game music.
        this.audioSource.pause()

        CCPokiSDK.gameplayStop()
        CCPokiSDK.commercialBreak()
    }

    onCommercialBreakDone(){
        /**
         * TODO:
         * 1) Resume Game
         * 2) Resume Music / Audio
         */
        CCPokiSDK.gameplayStart()
        this.audioSource.play()
    }
}
