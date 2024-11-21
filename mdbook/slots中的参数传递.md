插槽使用子组件和父组件数据

## vue

- 默认插槽

```vue
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

```vue
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

- 具名插槽

```vue
<!-- <MyComponent> 的模板 -->
<div>
  <slot name="footer" :text="greetingMessage" :count="1"></slot>
</div>
```

```vue
<MyComponent>
  <template #footer="{text, count}">
    <p>{{ text }}{{ count }}</p>
  </template>
</MyComponent>
```

## React

符合 jsx 规范的函数

```jsx
const MyComponent = ({ test, children }) => {
  return <div>
    {test('一')}
    {children}
  </div>;
};
function TestChildren({test}: {test}: string) {
  return <p>这是一个子组件{test}</p>;
}
<MyComponent test={TestChildren}>
  <p>hello</p>
  <p>world</p>
</MyComponent>;

// 最后渲染出来的是
<div>
  <p>这是一个子组件一</p>
  <p>hello</p>
  <p>world</p>
</div>
```
