import { game } from "cc"

type User = {
    username: string
    avatarUrl: string
}

type RewardedBreakParams = {
    onStart?: () => void
    size?: "small" | "medium" | "large"
}

function getPokiSDK(): any {
    const sdk = (window as any).PokiSDK

    if (!sdk) {
        throw new Error("PokiSDK is not available on window.")
    }

    return sdk
}

export class CCPokiSDK {
    static EVENT_REWARD_BREAK_DONE: string = "prbr"
    static EVENT_COMMERCIAL_BREAK_DONE: string = "pcvr"
    static EVENT_SHRABLE_URL_READY: string = "psur"

    static rewardedBreak(onStart?: () => void): Promise<boolean>
    static rewardedBreak(params?: RewardedBreakParams): Promise<boolean>
    static rewardedBreak(input?: (() => void) | RewardedBreakParams): Promise<boolean> {
        return getPokiSDK().rewardedBreak(input)
    }

    static rewardBreak(onStart?: () => void): Promise<boolean>
    static rewardBreak(params?: RewardedBreakParams): Promise<boolean>
    static rewardBreak(input?: (() => void) | RewardedBreakParams): Promise<boolean> {
        return getPokiSDK().rewardedBreak(input).then((success: boolean) => {
            game.emit(CCPokiSDK.EVENT_REWARD_BREAK_DONE, success)
            return success
        })
    }

    static commercialBreak(onStart?: () => void): Promise<void> {
        return getPokiSDK().commercialBreak(onStart).then(() => {
            game.emit(CCPokiSDK.EVENT_COMMERCIAL_BREAK_DONE)
        })
    }

    static displayAd(
        container: HTMLElement,
        size?: string,
        onCanDestroy?: () => void,
        onDisplayRendered?: (isEmpty: boolean) => void
    ): void {
        getPokiSDK().displayAd(container, size, onCanDestroy, onDisplayRendered)
    }

    static destroyAd(container: HTMLElement): void {
        getPokiSDK().destroyAd(container)
    }

    static shareableURL(params: Record<string, unknown>): Promise<string> {
        return getPokiSDK().shareableURL(params).then((url: string) => {
            console.log(url)
            game.emit(CCPokiSDK.EVENT_SHRABLE_URL_READY, url)
            return url
        })
    }

    static getURLParam(paramName: string): string {
        return getPokiSDK().getURLParam(paramName)
    }

    static getLanguage(): string {
        return getPokiSDK().getLanguage()
    }

    static getUser(): Promise<User | null> {
        return getPokiSDK().getUser()
    }

    static getToken(): Promise<string | null> {
        return getPokiSDK().getToken()
    }

    static login(): Promise<void> {
        return getPokiSDK().login()
    }

    static captureError(err: string | Error): void {
        getPokiSDK().captureError(err)
    }

    static gameLoadingFinished(): void {
        getPokiSDK().gameLoadingFinished()
    }

    static gameplayStop(): void {
        getPokiSDK().gameplayStop()
    }

    static gameplayStart(): void {
        getPokiSDK().gameplayStart()
    }

    static setDebug(toggle: boolean): void {
        getPokiSDK().setDebug(toggle)
    }

    static setLogging(toggle: boolean): void {
        getPokiSDK().setLogging(toggle)
    }

    static enableEventTracking(cmpIndex?: number): void {
        getPokiSDK().enableEventTracking(cmpIndex)
    }

    static openExternalLink(url: string): void {
        getPokiSDK().openExternalLink(url)
    }

    static playtestSetCanvas(canvas: HTMLCanvasElement | HTMLCanvasElement[] | null): void {
        getPokiSDK().playtestSetCanvas(canvas)
    }

    static playtestCaptureHtmlOnce(): void {
        getPokiSDK().playtestCaptureHtmlOnce()
    }

    static playtestCaptureHtmlForce(): void {
        getPokiSDK().playtestCaptureHtmlForce()
    }

    static playtestCaptureHtmlOn(): void {
        getPokiSDK().playtestCaptureHtmlOn()
    }

    static playtestCaptureHtmlOff(): void {
        getPokiSDK().playtestCaptureHtmlOff()
    }

    static movePill(topPercent: number, topPx: number): void {
        getPokiSDK().movePill(topPercent, topPx)
    }

    static measure(category: string, action: string, label: string, metadata?: Record<string, unknown>): void {
        getPokiSDK().measure(category, action, label, metadata)
    }

    static isAdBlocked(): boolean {
        return getPokiSDK().isAdBlocked()
    }
}
