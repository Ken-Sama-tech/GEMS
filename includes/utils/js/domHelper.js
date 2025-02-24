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
                return func(e);
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

//
export const throttle = (func, wait = 1000) => {

    let shouldWait = false;
    let waitingArgs;

    const timeoutFunc = () => {
        if (waitingArgs == null)
            shouldWait = false
        else {

            func(...waitingArgs)
            waitingArgs = null;

            setTimeout(timeoutFunc, wait);
        }
    }

    return (...args) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }

        func(...args)
        shouldWait = true;

        setTimeout(timeoutFunc, wait);
    }
};