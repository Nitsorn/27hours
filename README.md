This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Notes from Oat
Basic plasmo plugin that can automate and simulate user clicks and keyboard inputs. Follow location installation below.

### Important files/folders
- Root file is contents/index.tsx
- When recording a new automation, look at `useRecord()` hook. 
- `useAutomations()` fetches all saved automations and store in local storage.
- `Trigger` component is the floating bubble at the bottom of screen
- `Popup` component is the modal popup 

### How we track clicks and key downs
We listen to document's click and keydown events in `useRecord`. When we click an element, we use `finder` npm module to find the position of the element on the DOM.

When user click on inputs/textareas, we detect if the element is "typeable". If it is, we also bind a blur event. When user then blur on input, we check its value as the user input. This way we are not listening to individual characters being typed.

For complex input/textarea/contentEditable elements, user could click within the input but not input itself. For us to gain access to the related input/textarea element, we use `typeableClosestElement`.

### How we simulate the automation
To run the simulation, look at `startAutomation` from `useAutomate`. We run a for-loop for each element to click/input to paste. We wait for 1s between each step.

## Getting Started
First, run the development server:

```bash
yarn dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
yarn build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

To zip: 
```bash
yarn build --zip
```

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
