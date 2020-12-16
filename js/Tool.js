// 是否Object
function _isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
//  是否Array
function _isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
}

// 深度对比
function _compare(oldData, newData) {
    // 数据相同
    if (oldData === newData) {
        return true;
    } 
    //都是对象且长度相同
    if (_isObject(oldData) && _isObject(newData) && Object.keys(oldData).length === Object.keys(newData).length){ 
        // 遍历所有对象中所有属性,判断元素是否相同
        for (const key in oldData) {
            if (oldData.hasOwnProperty(key)) {
                if (!_compare(oldData[key], newData[key])) { //递归对比
                    // 对象中具有不相同属性 返回false
                    return false
                }
            }
        }
    } else if (_isArray(oldData) && _isArray(oldData) && oldData.length === newData.length) {//都是数组且长度相同
        // 遍历数组中所有元素,判断元素是否相同
        for (let i = 0, length = oldData.length; i < length; i++) {
            if (!_compare(oldData[i], newData[i])) {
                // 如果数组元素中具有不相同元素,返回false
                return false
            }
        }
    } else {
        // 其它均返回false
        return false
    }
    // 走到这里,说明数组或者对象中所有元素都相同,返回true
    return true
}
// Vue.prototype._compare = _compare;

function _concat(data1, data2, isRe = false) {
    /*
    data1:数据1,
    data2:数据2,
    isRe:是否保留重复数据,
    */
    if (isRe) {
      return data1.concat(data2);
    }

    let arr = [];

    for(let item2 of data2) {
       let isSame = false; // 是否相同

       for(let item1 of data1) {
            isSame = _compare(item1, item2);

            if(isSame) break;
       }

       // 不相同
       if (!isSame) {
            console.log('no', item2)
            arr.push(item2)
       }
    }
    return [...data1, ...arr];
}
