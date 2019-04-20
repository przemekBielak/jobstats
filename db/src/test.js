function convertSalaryToNumber(salary) {
    let val = 0;
    
    // get last character
    if(salary.toLowerCase().slice(-1) == 'k') {
        val = parseFloat(salary.slice(0, -1), 10) * 1000;
    }else {
        val = parseFloat(salary, 10);
    }

    return val;
};

console.log(convertSalaryToNumber('0'));