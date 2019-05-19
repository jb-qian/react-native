/*
 * @Author: 宋乾
 * @Date: 2019-05-19 19:25:57
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-19 20:18:00
 */

const distance = (name: string, ...arg: any) => {
    let arr: number[] = [];
    switch (arg.length) {
        case 1:
            arr = [arg[0], arg[0], arg[0], arg[0]];
            break;
        case 2:
            arr = [arg[0], arg[1], arg[0], arg[1]];
            break;
        case 3:
            arr = [arg[0], arg[1], arg[2], arg[1]];
            break;
        case 4:
            arr = [arg[0], arg[1], arg[2], arg[3]];
            break;
        default:
            break;
    }

    let json = {
        [`${name}Top`]: arr[0],
        [`${name}Right`]: arr[0],
        [`${name}Bottom`]: arr[0],
        [`${name}Left`]: arr[0],
    };

    return json;
}

const padding = (...arg: any) => distance('padding', ...arg);
const margin = (...arg: any) => distance('margin', ...arg);

const border = (width: number, color: string, type: string) => {
    let w = width;
    let border:any = {};
    switch (type) {
        case 'top':
            border.borderTopWidth = w;
            border.borderTopColor = color;
            break;
        case 'bottom':
            border.borderBottomWidth = w;
            border.borderBottomColor = color;
            break;
        case 'left':
            border.borderLeftWidth = w;
            border.borderLeftColor = color;
            break;
        case 'right':
            border.borderRightWidth = w;
            border.borderRightColor = color;
            break;
        default:
            border.borderWidth = w;
            border.borderColor = color;
            break;
    }
    return border;
}

export { distance };
export { padding };
export { margin };
export { border };