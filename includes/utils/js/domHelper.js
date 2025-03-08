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

export const generateUnqId = (prefix = '') => {
    return prefix + Math.random().toString(36).substring(2, 9);
}

export const sendAsUrlCom = (component) => {
    return encodeURIComponent(component);
}

export const observeVisibility = (selector, retries = 5, delay = 2000) => {
    const items = document.querySelectorAll(selector);

    if (items.length == 0) {
        if (retries > 0)
            return setTimeout(() => { observeVisibility(selector, retries - 1) }, delay);
        else
            return console.error(`Can't find element ${selector} after 5 retries`);
    }

    // console.log(`element ${selector} after ${retries} retry`)

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('invisible');
            } else {
                entry.target.classList.add('invisible');
            }
        });
    });

    items.forEach(item => observer.observe(item));

    const mutationObserver = new MutationObserver(() => {
        const newItems = document.querySelectorAll(selector);
        newItems.forEach(item => observer.observe(item));
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
};

export const removeExtraWhiteSpaces = (param) => {
    const arry = param.split(" ");

    const filter = arry.filter((s) => {
        if (s !== "") {
            return s;
        }
    });

    const str = filter.join(" ");

    return str;
};