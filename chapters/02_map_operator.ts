/**
 * Types 
 */

type OnNext = (value: string) => void
type OnCompletion = () => void
type OnError = (error: string) => void

type Subscription = {
    onNext: OnNext
    onCompletion: OnCompletion
    onError: OnError
}

/**
 * Observable
 */
class Observable {
    subscriptions: Subscription[] = []

    constructor() { }

    subscribe(subscription: Subscription) {
        this.subscriptions.push(subscription)
    }

    emit(value: string) {
        this.subscriptions.forEach((sub) => {
            sub.onNext(value)
        })
    }

    complete() {
        this.subscriptions.forEach((sub) => {
            sub.onCompletion()
        })
    }

    error(errorMessage: string) {
        this.subscriptions.forEach((sub) => {
            sub.onError(errorMessage)
        })
    }
}

function map(obs: Observable, transform: (value: string) => string): Observable {
    const mappedObservable = new Observable()
    obs.subscribe({
        onNext: (value) => mappedObservable.emit(transform(value)),
        onCompletion: () => mappedObservable.complete(),
        onError: (error) => mappedObservable.error(error)
    })

    return mappedObservable
}

let messages = new Observable()
let angryMessages = map(messages, (value) => value.toUpperCase() + "!!!!")
    
angryMessages.subscribe({
    onNext: (value) => console.log(value),
    onCompletion: () => console.log("[complete]"),
    onError: (error) => console.log(error),
})

messages.emit("hello there")
messages.emit("what do you mean?")
messages.emit("this is my inside voice")
messages.complete()
