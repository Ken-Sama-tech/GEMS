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

// throttle
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

//uniqid generator
export const generateUnqId = (prefix = '') => {
    return prefix + Math.random().toString(36).substring(2, 9);
}

//encode url component
export const sendAsUrlCom = (component) => {
    return encodeURIComponent(component);
}

//remove extra white spaces
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

//observer
export const observeVisibility = (array, parent, selector, retries = 5, delay = 2000) => {
    let currentIndex = null;

    const lazyLoad = (array, parent) => {

        if (currentIndex == null || !currentIndex) {
            let iteration = 0;
            array.some((value, index) => {
                parent.appendChild(value);
                iteration++;
                if (iteration == 20) {
                    iteration = 0;
                    currentIndex = index;
                    return true;
                }
            });
        } else {
            //this is where you adjust how many child you want to spawn
            for (let i = 0; i < 5; i++) {
                if (!array[currentIndex] || array[currentIndex] == undefined)
                    break;
                parent.appendChild(array[currentIndex]);
                currentIndex++;
            }
        }
    }

    lazyLoad(array, parent);

    const items = document.querySelectorAll(selector);

    if (items.length == 0) {
        if (retries > 0)
            return setTimeout(() => {
                observeVisibility(array, parent, selector, retries - 1)
            }, delay);
        else
            return console.error(`Can't find element ${selector} after 5 retries`);
    }

    // console.log(`element ${selector} after ${retries} retry`)

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('invisible', !entry.isIntersecting);
        });
    }, {
        threshold: 0.3,
        rootMargin: "100px",
    });

    items.forEach(item => observer.observe(item));

    const lastItemObserver = new IntersectionObserver(entries => {
        const lastItem = entries[0];
        if (!lastItem.isIntersecting)
            return;

        loadNewItems();
        lastItemObserver.unobserve(lastItem.target);
        lastItemObserver.observe(document.querySelector(`${selector}:last-child`));
    });

    lastItemObserver.observe(document.querySelector(`${selector}:last-child`));
    // const mutationObserver = new MutationObserver(() => {
    //     const newItems = document.querySelectorAll(selector);
    //     newItems.forEach(item => observer.observe(item));
    // });

    // mutationObserver.observe(document.body, {
    //     childList: true,
    //     subtree: true,
    // });

    const loadNewItems = () => {
        lazyLoad(array, parent);
    }

    window.addEventListener('beforeunload', () => {
        observer.disconnect();
        // mutationObserver.disconnect();
    });
};