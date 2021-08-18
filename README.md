# Website Readme Generator
> Super simple website readme generator.

## Installation
```
  npm i -g web-readme

# or

  yarn global add web-readme 
```

## How it works
It uses puppeteer to take a screenshot of the website and fills the super simple readme template with configuration params.

You have to create a new file named `readme.config.json` with: `name`, `description` and `url`.
Those fields will be used to take the screenshot of the website and fill the template.

