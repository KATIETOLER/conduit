/**
 * Types
 */
/**
 * Observable
 */
class Observable {
    subscriptions = [];
    constructor() { }
    subscribe(subscription) {
        this.subscriptions.push(subscription);
    }
    emit(value) {
        this.subscriptions.forEach((sub) => {
            sub.onNext(value);
        });
    }
    complete() {
        this.subscriptions.forEach((sub) => {
            sub.onCompletion();
        });
    }
    error(errorMessage) {
        this.subscriptions.forEach((sub) => {
            sub.onError(errorMessage);
        });
    }
    map(transform) {
        const mappedObservable = new Observable();
        this.subscribe({
            onNext: (value) => mappedObservable.emit(transform(value)),
            onCompletion: () => mappedObservable.complete(),
            onError: (error) => mappedObservable.error(error)
        });
        return mappedObservable;
    }
}
/**
 * Operators
 */
function merge(observable1, observable2) {
    const mergedObservable = new Observable();
    observable1.subscribe({
        onNext: (value) => mergedObservable.emit(value),
        onCompletion: () => mergedObservable.complete(),
        onError: (error) => mergedObservable.error(error),
    });
    observable2.subscribe({
        onNext: (value) => mergedObservable.emit(value),
        onCompletion: () => mergedObservable.complete(),
        onError: (error) => mergedObservable.error(error),
    });
    return mergedObservable;
}
function combineLatest(observable1, observable2) {
    const combinedObservable = new Observable();
    let obs1Latest = "";
    let obs2Latest = "";
    observable1.subscribe({
        onNext: (value) => {
            obs1Latest = value;
            combinedObservable.emit(obs1Latest + ", " + obs2Latest);
        },
        onCompletion: () => combinedObservable.complete(),
        onError: (error) => combinedObservable.error(error),
    });
    observable2.subscribe({
        onNext: (value) => {
            obs2Latest = value;
            combinedObservable.emit(obs1Latest + ", " + obs2Latest);
        },
        onCompletion: () => combinedObservable.complete(),
        onError: (error) => combinedObservable.error(error),
    });
    return combinedObservable;
}
/**
 * Usage: merge
 */
console.log("\n---------------------------------");
console.log("merge\n");
// Here we have two observables that could have come from anywhere...
// they could be button click handlers, web requests finishing, etc.
const observable1 = new Observable();
const observable2 = new Observable();
// We can take these two observables and "merge" them into one and then
// apply some transformations. In this way, we've created an "event processing
// pipeline" where events come in, go through some transformations, and then 
// come out the other side. 
const observable3 = merge(observable1, observable2)
    .map((value) => value.toUpperCase())
    .map((value) => value + "!!!!");
// Someone writing code can now subscribe to our observable and they don't have
// to know about where the data is coming from or how it's being transformed.
observable3.subscribe({
    onNext: (value) => console.log(value),
    onCompletion: () => console.log("complete"),
    onError: (error) => console.log(error),
});
// When the original streams/observables emit data, we will see that 
// our merged observable will also emit the results.
observable1.emit("1");
observable2.emit("2");
observable2.emit("hi");
observable1.emit("hello");
/**
 * Usage: combine
 *
 * Sometimes you want to know the status of a bunch of things when any of those
 * things change. For example, maybe you have a realtime stream of user data that
 * includes a first name, last name, and age and you would like to update the UI
 * in realtime to reflect any changes made.
 */
console.log("\n---------------------------------");
console.log("combineLatest\n");
const firstName = new Observable();
const lastName = new Observable();
const age = new Observable();
// First we can combine the names:
const nameStream = combineLatest(firstName, lastName);
// Next we can combine the name and age:
const userInfoStream = combineLatest(nameStream, age);
// Now when we subscribe to the userInfo stream, we get all the data we want
// and it's always up to date.
userInfoStream.subscribe({
    onNext: (value) => console.log(value),
    onCompletion: () => { },
    onError: (error) => console.log(error),
});
firstName.emit("Korra");
lastName.emit("McBitey");
age.emit("1 year old");
firstName.emit("Cid");
age.emit("4 months");
export {};
