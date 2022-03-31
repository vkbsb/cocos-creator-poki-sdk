import { game } from "cc"

const PokiSDK = (window as any).PokiSDK

export class CCPokiSDK 
{
    static EVENT_REWARD_BREAK_DONE:string = "prbr"
    static EVENT_COMMERCIAL_BREAK_DONE:string = "pcvr"
    static EVENT_SHRABLE_URL_READY:string = "psur"

    static rewardBreak(){
        try{
            const game_instance = game
            PokiSDK.rewardedBreak().then(
                (success)=>{
                    game_instance.emit(CCPokiSDK.EVENT_REWARD_BREAK_DONE, success)
                }
            )
        }catch(e){
            console.log(e)
        }
    }

    static commercialBreak(){
        const game_instance = game
        PokiSDK.commercialBreak().then(()=>{
            game_instance.emit(CCPokiSDK.EVENT_COMMERCIAL_BREAK_DONE)
        })
    }

    static gameplayStop(){
        PokiSDK.gameplayStop()
    }

    static gameplayStart(){
        PokiSDK.gameplayStart()
    }

    static shareableURL(params:any){
        // if run on e.g. https://poki.com/en/g/my-awesome-game it will return 
        //https://poki.com/en/g/my-awesome-game?gdid=myid&gdtype=mytype
        const game_instance = game
        PokiSDK.shareableURL(params).then(url => {
            console.log(url);
            game_instance.emit(CCPokiSDK.EVENT_SHRABLE_URL_READY, url)
        });
    }

    static getURLParam(param_name:string){
        return PokiSDK.getURLParam(param_name)
    }
}