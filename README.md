# semantic-release

## 1. Installation

Install emantic-release with npm

```bash
  # semantic-release
  npm i -D semantic-release

  # components
  npm i -D @semantic-release/changelog @semantic-release/git @semantic-release/github @semantic-release/npm @semantic-release/release-notes-generator
```

## 2. Write a release configuration

```javascript
module.exports = {
  branches: ["main"], // 指定在哪个分支下要执行发布操作
  plugins: [
    "@semantic-release/commit-analyzer", // 解析 commit 信息，默认就是 Angular 规范
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md", // 把发布日志写入该文件
      },
    ],
    "@semantic-release/npm", // 发布到NPM
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"], // 前面说到日志记录和版本好是新增修改的，需要 push 回 Git
      },
    ],
  ],
};
```

## 3. Configure continuous integration

${workspace}/.github/workflows/blank.yml

```yml
# 工作流名称
name: Build and Deploy

on:
  # 指明要运行的分支，跟上面配置保持一致
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      # 把分支拉出来
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      # 指定node版本
      - name: Set node version
        uses: actions/setup-node@v2
        with:
          node-version: "14"

      # 安装依赖，包括我们的 semantic-release 全套
      - name: Install
        run: |
          npm install

      # 打包你的插件/组件/库等等等
      - name: Build
        run: |
          npm run build

      # 执行 semantic-release 发布包
      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```

## 4. Environment variable configuration

We know that private information such as tokens and passwords cannot be placed in git files, so we extract them here.
First obtain the required token for NPM release and Git submission:

- How to obtain NPM_TOKEN: Log in to NPM -> Avatar -> Account -> Access Tokens -> Generate New Token, select the type of publish to have the corresponding permission, and copy the token after completion.
- How to obtain GITHUB_TOKEN: Log in to Github -> Avatar -> Settings -> Developer settings -> Personal access tokens -> Generate New Token, check the three permissions shown in the figure below, and copy the token after completion.

![image-20230204005323340](https://code-geass-blog.oss-cn-hangzhou.aliyuncs.com/image-20230204005323340.png)

Then we put these two tokens into the secret:

Find your project -> Settings -> secrets -> Actions -> New repository secret, and write the two into them respectively, the name is GITHUB_TOKEN and NPM_TOKEN, and the value is the token just obtained.

## 5. Run it

Semantic-release only recognizes key commits such as fix feat to execute the release operation.

When we commit a fix and push it, the Git Action will be executed, and the effect is as follows:

![image-20230204010009543](https://code-geass-blog.oss-cn-hangzhou.aliyuncs.com/image-20230204010009543.png)

## Documentation

- [semantic-release](https://github.com/semantic-release/semantic-release)
- [使用 semantic-release 搞定 NPM 和 Github 自动化部署](https://juejin.cn/post/7057797444410540040)
