 
![conduit logo](docs/conduit.png?raw=true)


# Conduit

*A guided tour through the world of discrete event stream processing.*

### What?

Ever wonder how libraries like RxJs work? Me too. This repo walks through the process of building a RxJs-like library from first principles.

### Usage

1. Browse through the chapters in `chapters/`. 
2. Run `node demo/chapter_XX.js` to run a particular chapter and see the output.

### Demo

```ts
// How can we combine multiple streams into one stream that preserve 
const firstName = new Observable()
const lastName = new Observable()
const age = new Observable()

// First we can combine the names:
const nameStream = combineLatest(firstName, lastName)

// Next we can combine the name and age:
const userInfoStream = combineLatest(nameStream, age)

// Now when we subscribe to the userInfo stream, we get all the data we want
// and it's always up to date.
userInfoStream.subscribe({
    onNext: (value) => console.log(value),
    onCompletion: () => { },
    onError: (error) => console.log(error),
})

firstName.emit("Kitty")
lastName.emit("McBitey")
age.emit("1 year old")
firstName.emit("Cat")
age.emit("4 months")

// Outputs:
//      Kitty, ""     , "" 
//      Kitty, McBitey, "" 
//      Kitty, McBitey, 1 year old
//      Cat  , McBitey, 1 year old
//      Cat  , McBitey, 4 months

```

### Can I use this in production?

Yes!

### Should I use this in production?

No!

### Roadmap

- [x] Simple `Observable` class with `map`, `merge`, and `combineLatest` operators.
- [ ] Add ability to cancel a subscription.
- [ ] Use TS generics to create streams of any type. 
- [ ] Implement `pipe` and make operators standalone (similar to RxJs)

### Copyright

MIT License

Copyright (c) 2023 Katie Toler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
