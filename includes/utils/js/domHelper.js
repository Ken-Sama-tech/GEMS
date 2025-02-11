//-------------- event listeners ---------------
export class EventListener {

    callEvent(element, event, func) {

        return element.addEventListener(event, func);

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