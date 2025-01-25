// ---------------- selector ---------------
export class Selector {

    getElemById(parent, id) {
        return parent.getElementById(id);
    }

    querySelectAll(parent, param) {
        return parent.querySelectorAll(param);
    }

    querySelect(parent, param) {
        return parent.querySelector(param);
    }
}
//-------------- event listeners ---------------
export class EventListener {

    addEventListener(element, event, func) {

        return element.addEventListener(event, func);

    }

    callEvent(element, event, func) {
        this.addEventListener(element, event, func);
    }
}

export class GlobalEventListeners {

    globalEvent(type, selector, func) {
        document.addEventListener(type, e => {
            if (e.target.matches(selector)) {
                func(e);
            }
        });
    }
}

// ------------------ class list ---------------
export class ClassList {

    addClassList(element, className) {
        return element.classList.add(className);
    }

    remClassList(element, className) {
        return element.classList.remove(className);
    }

    toggleClassList(element, className) {
        return element.classList.toggle(className);
    }
}

export class SetAttribute {

    setClass(element, attrName) {
        element.setAttribute('class', attrName);
    }

    setId(element, attrName) {
        return element.setAttribute('id', attrName);
    }

    setCusAttr(element, attr, attrName) {
        return element.setAttribute(attr, attrName);
    }

    getAttr(element, attrName) {
        return element.getAttribute(attrName);
    }

    remAttr(element, attrName) {
        return element.removeAttribute(attrName);
    }
}

export class CreateElement {
    crteElem(element) {
        return document.createElement(element);
    }
}

export class Append {

    appChild(parent, child) {
        return parent.appendChild(child);
    }
}

// debounce

export class Debounce {

    debounce(func, wait = 1000) {
        let timeout;

        return (...args) => {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                func(...args);
            }, wait);
        }
    }
}