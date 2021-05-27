import React from 'react';
import styles from '@/pages/labPages/style.less';
import { Button, Typography, Divider } from 'antd';

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

const { Title, Paragraph, Text, Link } = Typography;

export default () => {
  return (
    <>
      <div className={styles.index}>
        <Title>WASM</Title>
        <Paragraph>
          WebAssembly/wasm WebAssembly 或者 wasm
          是一个可移植、体积小、加载快并且兼容 Web 的全新格式
        </Paragraph>
        <Paragraph>
          Assembly
          指汇编代码，WebAssembly就是在web平台运行的汇编代码，作为中间语言，连接上层高级语言如C/C++和web平台，让高级语言编译成统一格式在web上运行，
          可以和JavaScript共同使用或取代部分JS代码
        </Paragraph>
        <Paragraph>
          WebAssembly的二进制格式可以被原生解码，这比 JavaScript
          的解析要快很多（实验表明至少要快20倍以上），在移动设备上能带来更好的用户体验
        </Paragraph>
        <Paragraph>
          Wasm中文文档：{' '}
          <Link href="https://www.wasm.com.cn/">https://www.wasm.com.cn/</Link>
        </Paragraph>
        <Divider />
        <Title>WASM测试</Title>
        <Paragraph>
          用C语言编写计算加法和Fibonacci数列函数，编译成wasm在web中调用
        </Paragraph>
        <Button type="default" onClick={handleWasmTest}>
          Wasm Test
        </Button>
        <Paragraph>
          <pre>
            //C代码
            <br />
            #include &lt;stdio.h&gt;
            <br />
            int add(int a, int b) {'\u007B'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;return a + b;
            <br />
            {'\u007d'}
            <br />
            int fibonacci(int n) {'\u007B'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;if (n &lt;= 1) {'\u007B'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return n;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'\u007d'} else {'\u007B'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return fibonacci(n -
            1) + fibonacci(n - 2);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'\u007d'}
            <br />
            {'\u007d'}
          </pre>
        </Paragraph>
      </div>
    </>
  );
};
