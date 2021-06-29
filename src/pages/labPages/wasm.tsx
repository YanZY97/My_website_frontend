import React, { useState } from 'react';
import styles from '@/pages/labPages/style.less';
import { Button, Typography, Divider, InputNumber } from 'antd';

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

const { Title, Paragraph, Text, Link } = Typography;

export default () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [res, setRes] = useState(0);

  const onChangeA = (value: any) => {
    setA(value);
  };
  const onChangeB = (value: any) => {
    setB(value);
  };
  const onChangeC = (value: any) => {
    setC(value);
  };

  const handleWasmTestAdd = async () => {
    const wasmUrl = '/clib/test.wasm';
    const { add } = await wasmTest(wasmUrl);
    setRes(add(a, b));
  };

  const handleWasmTestFib = async () => {
    const wasmUrl = '/clib/test.wasm';
    const { fibonacci } = await wasmTest(wasmUrl);
    setRes(fibonacci(c));
  };

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
        <div>
          <InputNumber
            min={0}
            max={10000000}
            defaultValue={0}
            onChange={onChangeA}
          />
          &nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;
          <InputNumber
            min={0}
            max={10000000}
            defaultValue={0}
            onChange={onChangeB}
          />
          &nbsp;&nbsp;
          <Button type="default" onClick={handleWasmTestAdd}>
            +
          </Button>
          <br />
          <br />
          <InputNumber min={0} max={40} defaultValue={0} onChange={onChangeC} />
          &nbsp;&nbsp;&nbsp;
          <Button type="default" onClick={handleWasmTestFib}>
            Fibonacci
          </Button>
          <br />
          &nbsp;<Title level={3}>res: {res}</Title>
        </div>
        <Paragraph>
          <pre className={styles.pre}>
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
