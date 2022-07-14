//if environmentFactors doesn't get passed through, the value of multiplier stays at 1, so it doesn't affect the yield in that case
const getYieldForPlant = (plant, environmentFactors) => {
    let multiplier = 1;
    if (environmentFactors) {
        for (envFactor in environmentFactors) {

            if (plant.factor[envFactor]) {
                percentage = plant.factor[envFactor][environmentFactors[envFactor]];
                console.log(percentage)
                modifier = 1 + percentage / 100;
                multiplier *= modifier;
            }
        }
    }
    return plant.yield * multiplier;
}

//every function except getCostsForCrop has environmentFactors as an argument, so it can eventually get passed through to getYieldForPlant,
//which is the only function that actually uses it
const getYieldForCrop = (input, environmentFactors) => {
    return getYieldForPlant(input.crop, environmentFactors) * input.numCrops;
}

const getTotalYield = (harvest, environmentFactors) => {
    return harvest.crops.reduce((currentYield, crop) => {
        return currentYield + getYieldForCrop(crop, environmentFactors)
    }, 0)
}

const getCostsForCrop = input => {
    return input.crop.costs * input.numCrops;
}

const getRevenueForCrop = (input, environmentFactors) => {
    return input.crop.sell_price * getYieldForCrop(input, environmentFactors);
}

const getProfitForCrop = (input, environmentFactors) => {
    return getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input)
}

const getTotalProfit = (harvest, environmentFactors) => {
    return harvest.crops.reduce((currentProfit, crop) => {
        return currentProfit + getProfitForCrop(crop, environmentFactors)
    }, 0)
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
}