document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("bars-container");
    const generateBtn = document.getElementById("generate");
    const startBtn = document.getElementById("start");
    const algoSelect = document.getElementById("algorithm");
    const speedInput = document.getElementById("speed");

    let delay = 200;

    // Generate random bars
    function generateArray(size = 30) {
        container.innerHTML = "";
        for (let i = 0; i < size; i++) {
            let value = Math.floor(Math.random() * 300) + 20;
            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${value}px`;
            container.appendChild(bar);
        }
    }

    function swap(el1, el2) {
        const temp = el1.style.height;
        el1.style.height = el2.style.height;
        el2.style.height = temp;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 🟩 Bubble Sort
    async function bubbleSort() {
        const bars = document.querySelectorAll(".bar");
        for (let i = 0; i < bars.length - 1; i++) {
            for (let j = 0; j < bars.length - i - 1; j++) {
                bars[j].style.background = "red";
                bars[j + 1].style.background = "red";

                await sleep(delay);

                if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                    swap(bars[j], bars[j + 1]);
                }

                bars[j].style.background = "#4caf50";
                bars[j + 1].style.background = "#4caf50";
            }
            bars[bars.length - 1 - i].style.background = "cyan";
        }
        bars[0].style.background = "cyan";
    }

    // 🟨 Selection Sort
    async function selectionSort() {
        const bars = document.querySelectorAll(".bar");
        let n = bars.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < n; j++) {
                bars[j].style.background = "red";
                await sleep(delay);
                if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                    if (minIndex !== i) bars[minIndex].style.background = "#4caf50";
                    minIndex = j;
                } else {
                    bars[j].style.background = "#4caf50";
                }
            }

            swap(bars[i], bars[minIndex]);
            bars[i].style.background = "cyan";
            bars[minIndex].style.background = "#4caf50";
        }
        bars[n - 1].style.background = "cyan";
    }

    // 🟧 Insertion Sort
    async function insertionSort() {
        const bars = document.querySelectorAll(".bar");
        let n = bars.length;

        for (let i = 1; i < n; i++) {
            let j = i;
            bars[i].style.background = "red";
            await sleep(delay);

            while (j > 0 && parseInt(bars[j].style.height) < parseInt(bars[j - 1].style.height)) {
                swap(bars[j], bars[j - 1]);
                j--;
                await sleep(delay);
            }

            bars[j].style.background = "cyan";
        }
    }

    // 🔶 Merge Sort
    async function mergeSortVisual(start, end) {
        if (start >= end) return;

        const mid = Math.floor((start + end) / 2);

        await mergeSortVisual(start, mid);
        await mergeSortVisual(mid + 1, end);
        await merge(start, mid, end);
    }

    async function merge(start, mid, end) {
        const bars = document.querySelectorAll(".bar");
        const left = [],
            right = [];

        for (let i = start; i <= mid; i++) left.push(parseInt(bars[i].style.height));
        for (let i = mid + 1; i <= end; i++) right.push(parseInt(bars[i].style.height));

        let i = 0,
            j = 0,
            k = start;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                bars[k].style.height = `${left[i]}px`;
                i++;
            } else {
                bars[k].style.height = `${right[j]}px`;
                j++;
            }
            await sleep(delay);
            k++;
        }

        while (i < left.length) {
            bars[k].style.height = `${left[i]}px`;
            i++;
            k++;
            await sleep(delay);
        }

        while (j < right.length) {
            bars[k].style.height = `${right[j]}px`;
            j++;
            k++;
            await sleep(delay);
        }
    }

    // 🔷 Quick Sort
    async function quickSortVisual(start, end) {
        if (start >= end) return;

        const pivotIndex = await partition(start, end);
        await quickSortVisual(start, pivotIndex - 1);
        await quickSortVisual(pivotIndex + 1, end);
    }

    async function partition(start, end) {
        const bars = document.querySelectorAll(".bar");
        let pivotValue = parseInt(bars[end].style.height);
        let pivotIndex = start;

        for (let i = start; i < end; i++) {
            if (parseInt(bars[i].style.height) < pivotValue) {
                swap(bars[i], bars[pivotIndex]);
                pivotIndex++;
            }
        }

        swap(bars[pivotIndex], bars[end]);
        return pivotIndex;
    }

    // 🎛️ Buttons
    generateBtn.addEventListener("click", () => generateArray());
    speedInput.addEventListener("input", () => delay = 510 - speedInput.value);

    startBtn.addEventListener("click", async() => {
        startBtn.disabled = true;
        generateBtn.disabled = true;
        algoSelect.disabled = true;

        const algo = algoSelect.value;
        const bars = document.querySelectorAll(".bar");

        if (algo === "bubble") await bubbleSort();
        else if (algo === "selection") await selectionSort();
        else if (algo === "insertion") await insertionSort();
        else if (algo === "merge") await mergeSortVisual(0, bars.length - 1);
        else if (algo === "quick") await quickSortVisual(0, bars.length - 1);

        startBtn.disabled = false;
        generateBtn.disabled = false;
        algoSelect.disabled = false;
    });

    generateArray();
});