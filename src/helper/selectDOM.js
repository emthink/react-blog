export default function queryDirectChildren (selector, root = document) {
  const match = /\s*(.*)\s(.*)\s*/.exec(selector);
  if (!root) {
    return [];
  }
  if (match[1] === '>') {
    let arr = [];
    let nodes = Array.prototype.slice.call(root.querySelectorAll(match[2]));
    nodes && nodes.forEach((item, index) => {
      if (item.parentNode === root) {
        arr.push(item);
      }
    });
    return arr;
  }
  return root;
}
