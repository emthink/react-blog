/* eslint-disable */
export default function (options = {}) {
  getTOC()
  /**
   * store head infos in a plain object.
   * @param {HTMLElement} heading
   * @return {Object}
   */
  function getHeadObject (head, prev) {
    let id = head.id

    if (options.idSelector) {
      id = head.id
      if (head.querySelector && head.querySelector(options.idSelector)) {
        id = head.querySelector(options.idSelector).id
      }
    }
    let obj = {
      id: id,
      children: [],
      nodeName: head.nodeName,
      headLevel: head.nodeName.replace(/\w(\d)$/, '$1'),
      textContent: head.textContent.trim()
    }

    return obj
  }
  /**
   * Select headings in content context,
   * and exclude any selector in options.ignoreSelector
   * @param {String} contentSelector
   * @param {Array} headSelector
   * @return {Array}
   */
  function queryHeads (contentSelector, headSelector) {
    let selectors = headSelector
    if (options.ignoreSelector) {
      selectors = headSelector.split(',')
        .map(function mapSelectors (selector) {
          return selector.trim() + ':not(' + options.ignoreSelector + ')'
        })
    }
    try {
      if (document.querySelector(contentSelector)) {
        return document.querySelector(contentSelector)
          .querySelectorAll(selectors)
      }
      return []
    } catch (e) {
      console.warn('warning: ' + e); // eslint-disable-line
      return []
    }
  }

  /**
   * Add a node to the nested array.
   * @param {Object} node
   * @param {Array} headArray
   * @return {Array}
   */
  function addHead (node, headsArray) {
    let obj = getHeadObject(node)
    let level = obj.headLevel
    let array = headsArray
    let lastNode = array[array.length - 1]
    let lastNodeLevel = lastNode
      ? lastNode.headLevel
      : 0
    let counter = level - lastNodeLevel

    while (counter > 0) {
      lastNode = array[array.length - 1]
      if (lastNode && lastNode.children !== undefined) {
        array = lastNode.children
      }
      counter--
    }

    array.push(obj)
    return array
  }

  /**
   * Nest heads array with 'children' property.
   * @param {Array} headingsArray
   * @return {Object}
   */
  function getTOC (heads) {
    if (!heads) {
      heads = queryHeads(options.contentSelector, options.headSelector)
    }
    return [].reduce.call(heads, function reducer (prev, cur) {
      let current = getHeadObject(cur)

      addHead(current, prev)
      return prev
    }, [])
  }

  return {
    getTOC: getTOC
  }
}
