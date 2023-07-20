import { finder } from "@medv/finder";

export function getSelector(t) {
  let target = t;
  let targetName = target?.constructor.name ?? null;

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

  const selector = finder(target, {
    root: document.body,          // Root of search, defaults to document.body.
    idName: (name) => !name.includes('react-select'),       // Check if this ID can be used.
    className: (name) => false,    // Check if this class name can be used.
    tagName: (name) => true,      // Check if tag name can be used.
    attr: (name, value) => {
      if (name === 'class') return false;
      if (name ===  'id')  return !value.includes('react-select');
      return true;
    }, // Check if attr name can be used.
    seedMinLength: 5,           
    optimizedMinLength: 2,
    threshold: 1000,
    maxNumberOfTries: 10_000,
  });
  return selector;
}

export const typeableClosestElement = (target, level = 0) => {
  if (!target) {
    return false;
  }

  return target.closest('input, textarea, select, div[contenteditable="true"]');
}
