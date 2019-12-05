export function shuffle(arr) {
    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
}

export function gen_index_of(arr) {
    var index_of = {};
    for (let i = 0; i < arr.length; ++i) {
        index_of[arr[i]] = i;
    }
    return index_of;
}

export function shallow_copy_array(arr) {
    var ret = [];
    for (let v of arr) {
        ret.push(v);
    }
    return ret;
}
