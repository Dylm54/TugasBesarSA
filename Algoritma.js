const stores = [
    { name: 'Store A', x: 2, y: 3 },
    { name: 'Store B', x: 4, y: 6 },
    { name: 'Store C', x: 5, y: 1 },
    { name: 'Store D', x: 8, y: 7 },
];

function distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function greedyRoute(stores) {
    let route = [];
    let visited = new Set();
    let current = stores[0];
    route.push(current);
    visited.add(current.name);

    while (visited.size < stores.length) {
        let nearest = null;
        let minDist = Infinity;
        for (let store of stores) {
            if (!visited.has(store.name)) {
                let dist = distance(current, store);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = store;
                }
            }
        }
        route.push(nearest);
        visited.add(nearest.name);
        current = nearest;
    }

    return route;
}

function calculateTotalDistance(route) {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
        totalDistance += distance(route[i], route[i + 1]);
    }
    return totalDistance;
}

let greedyResult = greedyRoute(stores);
let greedyDistance = calculateTotalDistance(greedyResult);

console.log('Greedy Route:', greedyResult);
console.log('Total Distance with Greedy:', greedyDistance);


function divideAndConquerRoute(stores) {
    if (stores.length <= 2) {
        return stores;
    }

    let mid = Math.floor(stores.length / 2);
    let left = stores.slice(0, mid);
    let right = stores.slice(mid);

    let leftRoute = divideAndConquerRoute(left);
    let rightRoute = divideAndConquerRoute(right);

    return mergeRoutes(leftRoute, rightRoute);
}

function mergeRoutes(left, right) {
    let mergedRoute = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (distance(left[i], right[j]) < distance(left[i], left[i + 1] || right[j + 1])) {
            mergedRoute.push(left[i]);
            i++;
        } else {
            mergedRoute.push(right[j]);
            j++;
        }
    }

    while (i < left.length) {
        mergedRoute.push(left[i]);
        i++;
    }

    while (j < right.length) {
        mergedRoute.push(right[j]);
        j++;
    }

    return mergedRoute;
}

let divideAndConquerResult = divideAndConquerRoute(stores);
let divideAndConquerDistance = calculateTotalDistance(divideAndConquerResult);

console.log('Divide & Conquer Route:', divideAndConquerResult);
console.log('Total Distance with Divide & Conquer:', divideAndConquerDistance);

console.log('Kesimpulan:');
if (greedyDistance < divideAndConquerDistance) {
    console.log(`Algoritma Greedy lebih efisien dengan total jarak tempuh: ${greedyDistance}`);
} else if (divideAndConquerDistance < greedyDistance) {
    console.log(`Algoritma Divide & Conquer lebih efisien dengan total jarak tempuh: ${divideAndConquerDistance}`);
} else {
    console.log(`Kedua algoritma memiliki efisiensi yang sama dengan total jarak tempuh: ${greedyDistance}`);
}

