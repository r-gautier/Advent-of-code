export function resolve(depthMeasurements: Array<number>): number{
    let depthIncreasedCount = 0;

    let previousDepth = depthMeasurements[0];
    depthMeasurements.forEach((currentDepth, index) => {
        if (index === 0) { return; }

        if (currentDepth > previousDepth ){
            ++depthIncreasedCount;
        }

        previousDepth = currentDepth;
    })

    return depthIncreasedCount;
}
