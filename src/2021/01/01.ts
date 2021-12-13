export function resolve(depthMeasurements: Array<number>, windowSize: number): number{
    let depthIncreasedCount = 0;

    let previousSum = computeSumOfSlidingWindow(windowSize - 1);
    for (let index = windowSize; index <= depthMeasurements.length; ++index){
        const currentSum = computeSumOfSlidingWindow(index);

        if (currentSum > previousSum ){
            ++depthIncreasedCount;
        }

        previousSum = currentSum
    }

    return depthIncreasedCount;

    function computeSumOfSlidingWindow(index: number){
        const slidingWindow = depthMeasurements.slice(index - (windowSize - 1), index + 1);

        return slidingWindow.reduce((partialSum, value) => (partialSum + value), 0);
    }
}
