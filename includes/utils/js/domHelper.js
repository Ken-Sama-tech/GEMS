// ---------------- selector ---------------
export class Selector {

    getElemById(id) {
        return document.getElementById(id);
    }

    querySelectAll(param) {
        return document.querySelectorAll(param);
    }

    querySelect(param) {
        return document.querySelector(param);
    }
}
//-------------- event listeners ---------------
export class EventListener {

    addEventListener(element, event, func) {

        if (element instanceof NodeList) {
            element.forEach((element) => {
                element.addEventListener(event, func);
            })
        } else if (element) {
            element.addEventListener(event, func);
        }

    }

    callEvent(element, event, func) {
        this.addEventListener(element, event, func);
    }
}

// ------------------ class list ---------------
export class ClassList {

    addClassList(element, className) {
        element.classList.add(className);
    }

    remClassList(element, className) {
        element.classList.remove(className);
    }

    toggleClassList(element, className) {
        element.classList.toggle(className);
    }
}

export class SetAttribute {

    setClass(element, attrName) {
        element.setAttribute('class', attrName);
    }
}