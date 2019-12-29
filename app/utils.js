exports.Set = class Set extends global.Set {
    static from(data) {
        if (data instanceof Set) return data;
        return new Set(data);
    }
    intersection(set2) {
        return new Set(Array.from(this).filter(val => set2.has(val)));
    }
    difference(set2) {
        return new Set(Array.from(this).filter(val => !set2.has(val)));
    }
    union(set2) {
        set2.forEach(val => this.add(val));
        return this;
    }
    isSuperset(subset) {
        for (let val of subset) {
            if (!this.has(val)) {
                return false;
            }
        }
        return true;
    }
}