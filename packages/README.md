# 一个 vue 编辑组件

## 功能列表

- [ ] 高亮选中区域

- [ ] 添加自定义事件，PS: 鼠标进入 或者 鼠标双击

- [ ] 添加 ToolBar

- [ ] 添加 EditPanel

  ```typescript
  /**打开弹窗**/
  interface openEditPanel {
    (source: Record<any, any>): Promise<{ action: "success" | "cancel" }>;
  }
  ```

- [ ] 添加 Input component

- [ ] 添加 JSON Editor
