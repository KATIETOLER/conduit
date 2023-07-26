/**
 * Types
 */
/**
 * Observable
 *
 * The central type of this event streaming library. Observables can be
 * observed via `subscribe` and emit events over time. Once an observable
 * has it's `complete` method called, it emits a final completion event,
 * removes all subscriptions, and no longer emits event. An observable can
 * emit an error via it's `error` method which acts similarly to completion.
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
}
// Now we can create an observable...
const messages = new Observable();
// Subscribe to events...
messages.subscribe({
    onNext: (value) => console.log(value),
    onCompletion: () => { console.log("[complete]"); },
    onError: (error) => console.log(error),
});
// And send messages...
messages.emit("hello!");
messages.emit("these are some events sent on the message stream");
messages.emit("this is the last message");
messages.complete();
export {};
