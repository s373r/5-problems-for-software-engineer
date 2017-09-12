'use strict';

const methodsPrint = (methods, ...methodArgs) => {
    for (let method of methods) {
        let methodArgsDisplayString = '';
        for (let methodArg of methodArgs) {
            methodArgsDisplayString += JSON.stringify(methodArg);
        }

        const methodResult = JSON.stringify(method(...methodArgs));

        console.log(`\t${method.name}\t(${methodArgsDisplayString}) ==> ${methodResult}`);
    }
};

const task_01 = () => {
    const numberList = [1, 2 ,3];

    let method_01_A = (numberList) => {
        let listSum = 0;

        for (let number of numberList) {
            listSum += number;
        }

        return listSum;
    };

    let method_01_B = (numberList) => {
        let listSum = 0;

        for (let i = 0; i < numberList.length; ++i) {
            listSum += numberList[i];
        }

        return listSum;
    };

    let method_02 = (numberList) => {
        let listSum        = 0;
        let numberListCopy = [...numberList];

        while (numberListCopy.length) {
            listSum += numberListCopy.pop();
        }

        return listSum;
    };

    let method_03 = (numberList) => {
        const recursiveSum = (numberList, currentIndex = 0, currentSum = 0) => {
            if (currentIndex >= numberList.length) {
                return currentSum;
            }
            return recursiveSum(numberList, currentIndex + 1, currentSum + numberList[currentIndex])
        };

        return recursiveSum(numberList);
    };

    methodsPrint([method_01_A, method_01_B, method_02, method_03], numberList);
};

const task_02 = () => {
    const firstList  = [1, 2, 3, 4];
    const secondList = ['a', 'b', 'c'];

    let method_01 = (firstList, secondList) => {
        const maxLength = Math.max(firstList.length, secondList.length);

        let mergedList = [];
        for (let i = 0; i < maxLength; ++i) {
            if (firstList.hasOwnProperty(i)) {
                mergedList.push(firstList[i]);
            }
            if (secondList.hasOwnProperty(i)) {
                mergedList.push(secondList[i]);
            }
        }

        return mergedList;
    };

    methodsPrint([method_01], firstList, secondList)
};

const task_03 = () => {
    const numberCount        = 100;
    const initFibonacciArray = [0, 1];

    let method_01 = (initFibonacciArray, numberCount) => {
        const getFibonacciArray = (fibonacciArray, numberCount) => {
            const fibonacciArrayLength = fibonacciArray.length;

            if (fibonacciArrayLength >= numberCount) {
                return fibonacciArray;
            }

            const n        = fibonacciArray[fibonacciArrayLength - 2];
            const nPlusOne = fibonacciArray[fibonacciArrayLength - 1];

            fibonacciArray.push(n + nPlusOne);

            return getFibonacciArray(fibonacciArray, numberCount);
        };

        return getFibonacciArray(initFibonacciArray, numberCount);
    };

    methodsPrint([method_01], initFibonacciArray, numberCount);
};

const task_04 = () => {
    const numberList = [50, 2, 1, 9];

    let method_01 = (numberList) => {
        numberList.sort((left, right) => {
            const leftAsString  = left.toString();
            const rightAsString = right.toString();

            const maxLength = Math.max(leftAsString.length, rightAsString.length);

            if (leftAsString.length === rightAsString.length) {
                return right - left;
            }

            for (let i = 0; i < maxLength; ++i) {
                const leftDigit  = leftAsString[i];
                if (leftDigit === undefined) {
                    return 1;
                }

                const rightDigit = rightAsString[i];
                if (rightDigit === undefined) {
                    return -1;
                }

                if (leftDigit === rightDigit) {
                    continue;
                }

                return rightDigit - leftDigit;
            }
        });

        return numberList.join('');
    };

    methodsPrint([method_01], numberList);
};

const task_05 = () => {
    const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let method_01 = (numberList) => {
        const operationTypes  = ['+', '-', ''];
        let   operationsCount = numberList.length - 1;

        const recursiveLoops = (indexes, variantCount, digits, death, callback) => {
            if (death < digits) {
                for (let i = 0; i < variantCount; ++i) {
                    indexes[death] = i;
                    recursiveLoops(indexes, variantCount, digits, death + 1, callback);
                }
            } else {
                callback(indexes);
            }
        };

        let results = [];
        recursiveLoops([], operationTypes.length, operationsCount, 0, (indexes) => {
            let expression = '';
            for (let i = 0; i < numberList.length; ++i) {
                expression += numberList[i].toString();
                if (indexes.hasOwnProperty(i)) {
                    expression += operationTypes[indexes[i]];
                }
            }

            const expressionResult = eval(expression);
            if (expressionResult === 100) {
                results.push(`${expression} = ${expressionResult}`);
            }
        });

        return results;
    };

    methodsPrint([method_01], numberList);
};

const tasks = [task_01, task_02, task_03, task_04, task_05];

for (let task of tasks) {
    console.log(task.name);
    task();
}
