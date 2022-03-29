# Poki Extension for Cocos Creator 3.x
`Note: This extension works for CocosCreator3.4.0 and above only`

This extension makes it easy to integrate the poki's [HTML5 SDK](https://sdk.poki.com/html5/) into your Cocos Creator(3.x) game. You can create custom build and preview templates to do the integration by yourself, but the extension provides them ready to use. 

The extension provides:
- preview template 
- web-mobile build template
- PokiSDK abstraction 
- Demo scene showcasing usage

Once you install and enable the extension, you will be able to test the poki sdk integration in preview mode (in browser) and be able to make builds(web-mobile) that can be uploaded to poki platform. 

## 1.Installation
You should be able to download and install the extension in two ways

### Cocos Store
You can search and install the extension directly from the cocos store. 
This is the easiest way to get started with the extension. 
//screenshots of the store and install process. 

### From Source/Release
Download the extension zip file from 
```
https://github.com/vkbsb/cocos-creator-poki-sdk/releases/download/FirstRelease/poki-sdk-v1.0.zip
```

Or download the source code as a zip file.  
``` 
git clone https://github.com/vkbsb/cocos-creator-poki-sdk
```

1. Once this is done, you can launch extensions manager in cocos creator editor
![extension-manager-open](./docs/images/extension-manager-launch.png)
2. Switch to project tab and click on add extension button
![extension-add](./docs/images/import_extension_project.png)


## 2.Enable extension
Once you have done the installation go to the extensions manager and ensure that the 
poki-build extension is enabled. 

open extension manager

![extension-manager-open](./docs/images/extension-manager-launch.png)

Under project tab, ensure that poki-sdk is enabled. If it's not enabled, enable it. 

![extension-enable](./docs/images/poki_build_extension_enable.png)

The extension creates the following files in your project directory.
- preview-template/index.ejs
- build-templates/common/application.ejs
- build-templates/web-mobile/index.ejs
- assets/poki-api/SiteLock.js
- assets/poki-api/PokiPlatform.ts
- assets/demo/demo.scene
- assets/demo/DemoScript.ts

![folders-created](./docs/images/poki_files_added.png)

## 3.Usage 
In your component scripts, you will be able to import CCPokiSDK and use it to interact with the PokiSDK. The following are the functions that are available for you to use from your game scripts. Checkout the DemoScript.ts for example usage.

```typescript
CCPokiSDK.gameplay_start() //-- in JS it's PokiSDK.gameplayStart()
CCPokiSDK.gameplay_stop() //-- in JS it's PokiSDK.gameplayStop()
CCPokiSDK.commercial_break() //-- in JS it's PokiSDK.commercialBreak()
CCPokiSDK.rewarded_break() //-- in JS it's PokiSDK.rewardedBreak()
CCPokiSDK.shareable_url(params, callback) //-- in JS it's PokiSDK.shareableURL({}).then(url => {})
local value = CCPokiSDK.get_url_param(key) //-- in JS it's PokiSDK.getURLParam('id')
CCPokiSDK.isAdBlocked()  //-- in JS it's PokiSDK.isAdBlocked()
```

You will notice that you do not see an equivalent to ``PokiSDK.set_debug(value)`` this is because the extension sets this automatically based on the build you make. 
```
________________________________________________________
| Build Type                  | PokiSDK Debug           |
|_____________________________|_________________________|
| Preview Build               | PokiSDK.set_debug(true) |
| web-mobile:Debug(checked)   | PokiSDK.set_debug(true) |
| web-mobile:Debug(un-checked)| PokiSDK.set_debug(false)|
---------------------------------------------------------
```

**Reward Break**

Typically in your game you would want to reward players once they watched the reward video. The following are the steps you need to follow to implement the same using this extension. 
- Register for a call back on `cc.game` for `EVENT_REWARD_BREAK_DONE`
- if `arguments[0] == true` we can give player reward, else don't reward.  

Check out [DemoScript.ts](./templates/demo/DemoScript.ts) for referrence. 


**SiteLock**

Poki provides a sitelock code to the developers which helps ensure that the game is playable only on poki's website. Please collect it from your dev contact. Once you get it, paste the code in the [SiteLock.js](./templates/poki-api/SiteLock.js) file at the appropriate location.


**Generate Build**

You will need to make ``web-mobile`` build for the extension to do the poki sdk integration. 
#TODO screentshots for web-mobile web creation.
