const App = {
    itemMinVal: 20,
    itemMaxVal: 300,
    timeout: 0,
    startTime: 0,
    sounds: {
        sorting: new Audio('./sounds/beep.wav'),
        finished: new Audio('./sounds/fertig.wav')
    },
    init: () => {
        App.rndmArr();
        App.startTime = (new Date()).getTime();
        Sortierverfahren.bubbleSort();
    },
    benchmark: (pName) => {
        let time = (new Date()).getTime() - App.startTime;
        console.log(pName + ' finished in :' + time + 'ms');
    },
    rndmArr: () => {
        for(let i = 0; i < 20; i++) {
            let currentItemVal  = App._getRndmInt(App.itemMinVal, App.itemMaxVal);
            let currentDOMEl = $(document.createElement( "div" ))
                .css('height', currentItemVal + 'px');
            let domWrapper = $(document.createElement( "div" ))
                .addClass('bar')
                .attr('id', currentItemVal)
                .attr('title', currentItemVal)
                .html(currentDOMEl);
            $('#bars').append(domWrapper);
        }
    },
    _getRndmInt: (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
const Sortierverfahren = {
     bubbleSort: async () => {
        let swapped = false;
        do {
            let items = $('#bars .bar');
            swapped = false;
            let lastItem = -1;
            for (let j = 0; j < items.length; j++) {
                await new Promise(resolve => {
                    setTimeout(() => {
                        let current = items[j];
                        if (Number($(current).attr('id')) < lastItem) {
                            App.sounds.sorting.play();
                            swapped = true;
                            $(current).insertBefore($('#' + lastItem));
                            console.log(j);
                        }
                        lastItem = Number($(current).attr('id'));
                        return resolve();
                    }, App.timeout);
                });
            }
        } while(swapped);
        App.sounds.finished.play();
        App.benchmark('Bubblesort');
    },
    quicksort: () => {
         let arr = $('#bars .bar');
         let pivot = Number($('#bars').last().attr('id'));
         let left = 0;
         let right = pivot;
         do {

         } while(left < right);
    }
};
const Suchverfahren = {

};
$(document).ready(App.init);