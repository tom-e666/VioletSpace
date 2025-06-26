export const getCharacterizedMoney = (amount: number): string => {
    // --- Data Arrays ---
    const digits: string[] = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    const majorUnits: string[] = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];

    // --- Helper function to read a three-digit block (0-999) ---
    const readThreeDigits = (threeDigitBlock: string, isFirstGroup: boolean = false): string => {
        // Pad with leading zeros if needed
        const paddedBlock = threeDigitBlock.padStart(3, '0');
        const num = parseInt(paddedBlock, 10);
        if (num === 0) return "";

        const [hundred, ten, one] = paddedBlock.split('').map(Number);
        const parts: string[] = [];

        // Read hundreds place
        if (hundred > 0) {
            parts.push(digits[hundred], "trăm");
        }

        // Read tens and ones place
        if (ten > 1) {
            parts.push(digits[ten], "mươi");
            // Handle "mốt" for number 1 (only when tens > 1)
            if (one === 1) {
                parts.push("mốt");
            }
            // Handle "lăm" for number 5 (only when tens > 1)
            else if (one === 5) {
                parts.push("lăm");
            }
            // Handle other numbers
            else if (one > 0) {
                parts.push(digits[one]);
            }
        } else if (ten === 1) {
            parts.push("mười");
            if (one > 0) {
                parts.push(digits[one]);
            }
        } else { // ten === 0
            // Add "linh" if there's a hundreds place and a non-zero ones place
            if (hundred > 0 && one > 0) {
                parts.push("linh");
            }
            if (one > 0) {
                parts.push(digits[one]);
            }
        }

        return parts.join(" ");
    };

    // --- Main Function Logic ---

    // Handle edge case of 0
    if (amount === 0) {
        return "không";
    }

    // Ensure we are working with a safe integer as a string
    const amountStr = Math.floor(Math.abs(amount)).toString();

    // Split the number string into groups of three from the right
    let groups: string[] = [];
    for (let i = amountStr.length; i > 0; i -= 3) {
        groups.unshift(amountStr.slice(Math.max(i - 3, 0), i));
    }

    // Read each group and append the corresponding major unit
    const resultParts: string[] = [];
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const textValue = readThreeDigits(group, i === 0);
        if (textValue) {
            const majorUnitIndex = groups.length - i - 1;
            const majorUnit = majorUnits[majorUnitIndex] || "";
            if (majorUnit) {
                resultParts.push(`${textValue} ${majorUnit}`);
            } else {
                resultParts.push(textValue);
            }
        }
    }

    // Join all parts and clean up extra spaces
    let result = resultParts.join(" ").trim();
    
    // Clean up multiple spaces
    result = result.replace(/\s+/g, " ");
    
    // Capitalize first letter
    if (result) {
        result = result.charAt(0).toUpperCase() + result.slice(1);
    }

    return result;
};