export function resolve(depthMeasurements: Array<number>): number{
    let depthIncreasedCount = 0;

    let previousDepth = depthMeasurements[0];
    for (let index = 1; index < depthMeasurements.length; ++index){
        const currentDepth = depthMeasurements[index];

        if (currentDepth > previousDepth ){
            ++depthIncreasedCount;
        }

        previousDepth = currentDepth
    }

    return depthIncreasedCount;
}
