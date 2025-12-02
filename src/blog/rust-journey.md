---
id: 2
title: 'My Journey into Rust Programming'
date: 'Sep 28, 2024'
excerpt: 'The borrow checker was my enemy, now it is my best friend. How learning Rust changed the way I write code.'
category: 'Coding'
---

# My Journey into Rust Programming

![Rust](https://picsum.photos/800/400?random=11)

The borrow checker was my enemy, now it is my best friend.

## Ownership & Borrowing
Coming from C++ and Python, Rust's memory model was a shock.

> "Rust guarantees memory safety without garbage collection."

This sounded like magic. It turns out, it's just strict rules.

### Code Example
```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; 
    // println!("{}, world!", s1); // This would fail!
    println!("{}, world!", s2);
}
```

## Conclusion
If you haven't tried Rust yet, give it a go. The compiler error messages are actually helpful!
