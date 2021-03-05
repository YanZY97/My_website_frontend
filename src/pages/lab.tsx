import React from 'react';
import styles from './lab.less';
import { Button, message } from 'antd';
import { MarkdownEditor } from '@/components/components';

const wasmTest = async (url: string) => {
  const env = {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({
      initial: 256,
    }),
    table: new WebAssembly.Table({
      initial: 2,
      element: 'anyfunc',
    }),
  };
  const instance = await fetch(url)
    .then(response => {
      return response.arrayBuffer();
    })
    .then(bytes => {
      return WebAssembly.instantiate(bytes, { env: env });
    })
    .then(instance => {
      return instance.instance.exports;
    });
  return instance;
};

const handleWasmTest = async () => {
  const wasmUrl = 'http://localhost:3000/clib/test.wasm';
  const { add, fibonacci } = await wasmTest(wasmUrl);
  console.log(add(2, 5));
  console.log(fibonacci(8));
};

export default () => {
  return (
    <>
      <div>
        <h1 className={styles.title}>Page lab</h1>
        <Button type="default" onClick={handleWasmTest}>
          Wasm Test
        </Button>
        <MarkdownEditor />
      </div>
    </>
  );
};
