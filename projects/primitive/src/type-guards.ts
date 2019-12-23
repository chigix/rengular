import { ChoiceMenuLd } from './lib/choice-menu';

export function isChoiceMenu(jsonld: object): jsonld is ChoiceMenuLd {
  return jsonld['@type'] === 'http://rengular.js.org/schema/ChoiceMenu';
}

export function isLayeredImage(jsonld: object): jsonld is ChoiceMenuLd {
  return jsonld['@type'] === 'http://rengular.js.org/schema/LayeredImage';
}

export function isOarsPocket(jsonld: object): jsonld is ChoiceMenuLd {
  return jsonld['@type'] === 'http://rengular.js.org/schema/OarsPocket';
}

export function isTextBox(jsonld: object): jsonld is ChoiceMenuLd {
  return jsonld['@type'] === 'http://rengular.js.org/schema/Textbox';
}
