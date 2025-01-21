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

    getElemBy
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