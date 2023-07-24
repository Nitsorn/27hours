import { finder } from "@medv/finder";

export type SupportedPlatform = 'jira' | 'retool' | 'unsupported';

export function getSelector(t, platform: SupportedPlatform) {
  let target = t;
  let targetName = target?.constructor.name ?? null;

  let config = {
    root: document.body,  
    idName: (name) => true,
    className: (name) => false,
    tagName: (name) => true,
    attr: (name, value) => true,
    seedMinLength: 5,           
    optimizedMinLength: 2,
    threshold: 1000,
    maxNumberOfTries: 10_000,
  };

  switch (platform) {
    case 'jira': 
      config = {
        ...config,
        idName: (name) => !name.includes('react-select'),
        className: (name) => false,
        tagName: (name) => true,
        attr: (name, value) => {
          if (name === 'class') return false;
          if (name ===  'id')  return !value.includes('react-select');
          return true;
        }, // Check if attr name can be used.
      }
    default:
      break;
  }

  const validTargetNames = ['HTMLDivElement', 'HTMLAnchorElement', 'HTMLButtonElement', 'HTMLInputElement', 'HTMLTextAreaElement', 'HTMLSelectElement'];

  // check if the target is a valid target
  // if not, get the closest valid target
  if (!validTargetNames.includes(targetName)) {
    target = target.closest('div, button, a, input, textarea, select');
    targetName = target?.constructor.name ?? null;

    if (!target || targetName === null) {
      return;
    }
  }

  const selector = finder(target, config);
  return selector;
}

export const typeableClosestElement = (target, level = 0) => {
  if (!target) {
    return false;
  }

  return target.closest('input, textarea, select, div[contenteditable="true"]');
}
