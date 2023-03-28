/**
 * String to Hex
 * @param str 
 * @returns 
 */
export const toHex = (str: string | number) => {
    return '0x' + Number(str.toString()).toString(16);
  };
  