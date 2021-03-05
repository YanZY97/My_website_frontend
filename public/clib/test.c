#include <stdio.h>

int add(int a, int b) {
   return a + b;
}

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

// emcc test.c -Os -s WASM=1 -s SIDE_MODULE=1 -o test.wasm