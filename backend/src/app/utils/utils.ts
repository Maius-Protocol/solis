import { BigNumber } from 'bignumber.js';

function convertToBigNumber(number: number | string): BigNumber {
    return new BigNumber(number);
}

export function multiplyBigNumbers(a: number | string, b: number | string): BigNumber {
    let aBigNum = convertToBigNumber(a);
    let bBigNum = convertToBigNumber(b);
    return aBigNum.times(bBigNum);
}

export function divideBigNumbers(a: number | string, b: number | string): BigNumber {
    let aBigNum = convertToBigNumber(a);
    let bBigNum = convertToBigNumber(b);
    return aBigNum.dividedBy(bBigNum);
}