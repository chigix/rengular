import { ChoiceMenuLd } from './lib/choice-menu';

export function isChoiceMenu(jsonLdObj: object): jsonLdObj is ChoiceMenuLd {
  return jsonLdObj['@type'] === 'http://rengular.js.org/schema/ChoiceMenu';
}

export function isLayeredImage(jsonLdObj: object): jsonLdObj is ChoiceMenuLd {
  return jsonLdObj['@type'] === 'http://rengular.js.org/schema/LayeredImage';
}

export function isOarsPocket(jsonLdObj: object): jsonLdObj is ChoiceMenuLd {
  return jsonLdObj['@type'] === 'http://rengular.js.org/schema/OarsPocket';
}

export function isTextBox(jsonLdObj: object): jsonLdObj is ChoiceMenuLd {
  return jsonLdObj['@type'] === 'http://rengular.js.org/schema/Textbox';
}
