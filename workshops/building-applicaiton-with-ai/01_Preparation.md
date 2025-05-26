# Preparation

## What we need before the workshop?

This workshop needs the following tools.

- Git
- Any terminal app
- Node
- VSCode
- VSCode Extensions

If you don't know how to install these tools please follow the instructions below or ask your colleagues to install them together.

## Installation

### Terminal app

Any terminal apps (Terminal, GNOME, iTerm2, Alacrity, and etc...) are OK. Please install the one you want to use.

### Git

Install Git from https://git-scm.com/downloads

### Node manager

In this workshop, we use the Node version specified in [.node-version](.node-version) You can use whatever node version manager you like to install the node version. As an example, we will use [n](https://github.com/tj/n) to install the node.

Follow the official n installation manual https://github.com/tj/n and run the command below to install the node version used in this project.

```bash
n auto
```

You can check the current node version with the commands below if `auto` command successfully installed the node.

```
$ n auto
       found : /Users/takayuki-watanabe/src/github.com/takanabe/ai-lab/workshops/building-applicaiton-with-ai/.node-version
        read : 22.16.0
     copying : node/22.16.0
   installed : v22.16.0 (with npm 10.9.2)

$ node -v
v22.16.0

$ which node
/Users/takayuki-watanabe/.n/bin/node
```

### NPM

To manage node packages, we use `npm`. If you install the node via `n`, you automatically installed `npm`. 

```
$ npm -v
10.9.2
```

If you installed `node` via different node package managers, please make sure you installed `npm`.

### VSCode

1. Install VSCode from https://code.visualstudio.com/download 
1. Follow https://code.visualstudio.com/docs/configure/command-line to configure `code` command to run VSCode from your terminal.


### VSCode extensions


#### Cline

This extension enables VSCode to integrate your favorite LLM as AI Agent.

Install from https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev 
