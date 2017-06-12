export function getDateByReverseIndexFromInput(): number {
    let dateByReverseIndex = 0;
    const input = process.argv[2];
    if (input) {
        const numericInput = +input;
        if (isNaN(numericInput)) {
            console.log("Input parameter should represent the number of days past since the to-be-submitted entry");
            process.exit(1);
        } else {
            dateByReverseIndex = numericInput;
        }
    }

    return dateByReverseIndex;
}
