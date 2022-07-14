const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Get yield for plant with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
            wind: "medium",
            temperature: "low"
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(15)
    })
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });

    test("Get yield for crop with environmental factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "high",
            wind: "medium",
            temperature: "low"
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(45)
    })
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
    test("Calculate total yield with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                wind: {
                    low: 25,
                    medium: 0,
                    high: -25,
                },
                temperature: {
                    low: 0,
                    medium: 25,
                    high: -25,
                },
            }
        };
        const environmentFactors = {
            sun: "high",
            wind: "low",
            temperature: "medium"
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops }, environmentFactors)).toBe(35)
    })
});

describe("getCostsForCrop", () => {
    test("get the costs for an amount of a crop", () => {
        const corn = {
            name: "corn",
            costs: 2
        };
        const input = { crop: corn, numCrops: 10 };
        expect(getCostsForCrop(input)).toBe(20);
    })
})

describe("getRevenueForCrop", () => {
    test("get the revenue for an amount of a single crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            sell_price: 4
        }
        const input = { crop: corn, numCrops: 10 };
        expect(getRevenueForCrop(input)).toBe(120);
    })
    test("get the revenue for a single crop with environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            sell_price: 5,
            factor: {
                wind: {
                    low: 25,
                    medium: 0,
                    high: -25,
                },
                temperature: {
                    low: 0,
                    medium: 25,
                    high: -25,
                },
            }
        };
        const environmentFactors = {
            sun: "high",
            wind: "low",
            temperature: "medium"
        };
        const input = { crop: pumpkin, numCrops: 10 };
        expect(getRevenueForCrop(input, environmentFactors)).toBe(312.5)
    })
})

describe("getProfitForCrop", () => {
    test("get the profit for an amount of a single crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 2,
            sell_price: 4
        }
        const input = { crop: corn, numCrops: 10 };
        expect(getProfitForCrop(input)).toBe(100);
    })
    test("get the profit for a single crop with environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costs: 6,
            sell_price: 5,
            factor: {
                wind: {
                    low: 25,
                    medium: 0,
                    high: -25,
                },
                temperature: {
                    low: 0,
                    medium: 25,
                    high: -25,
                },
            }
        };
        const environmentFactors = {
            sun: "high",
            wind: "low",
            temperature: "medium"
        };
        const input = { crop: pumpkin, numCrops: 10 };
        expect(getProfitForCrop(input, environmentFactors)).toBe(252.5)
    })

})

describe("getTotalProfit", () => {
    test("get the profit of multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 2,
            sell_price: 4
        }
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costs: 3,
            sell_price: 5
        }
        const crops = [
            { crop: corn, numCrops: 10 },
            { crop: pumpkin, numCrops: 20 }
        ]
        expect(getTotalProfit({ crops })).toBe(440)
    })
    test("get the profit of multiple crops with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 2,
            sell_price: 4,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        }
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costs: 3,
            sell_price: 5,
            factor: {
                wind: {
                    low: 25,
                    medium: 0,
                    high: -25,
                },
                temperature: {
                    low: 0,
                    medium: 25,
                    high: -25,
                },
            }
        }
        const strawberry = {
            name: "strawberry",
            yield: 2,
            costs: 1,
            sell_price: 6,
            factor: {
                wind: {
                    low: 25,
                    medium: 0,
                    high: 0,
                },
                temperature: {
                    low: -30,
                    medium: 0,
                    high: 30,
                },
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            }
        }
        const environmentFactors = {
            sun: "low",
            wind: "high",
            temperature: "low"
        };
        const crops = [
            { crop: corn, numCrops: 10 },
            { crop: pumpkin, numCrops: 20 },
            { crop: strawberry, numCrops: 50 },
        ]
        expect(getTotalProfit({ crops }, environmentFactors)).toBe(440)
    })
})

