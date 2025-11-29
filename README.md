## 🚀 Run locally

1.  **Install Bun**

2.  **Clone the repo**

3.  **Setup the Environment**
    You will need to setup an .env.development file in the root with a Contentful spaceID and access token.

    ```shell
    CONTENTFUL_SPACE_ID=space_id_goes_here
    CONTENTFUL_ACCESS_TOKEN=access_token_goes_here
    ```

4.  **Open the source code and start editing!**

    Navigate your terminal to the repo's folder and run these commands:

    ```shell
    bun install && bun dev
    ```

5.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:3000`!

6.  **Below is a sample of the deploy script I'm using in Github actions**

```shell
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Build
        run: |
          bun install
          bun run build
        env:
          CONTENTFUL_SPACE_ID: ${{ secrets.CONTENTFUL_SPACE_ID }}
          CONTENTFUL_ACCESS_TOKEN: ${{ secrets.CONTENTFUL_ACCESS_TOKEN }}

      - uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: aws s3 sync ./out s3://matthanesprojects.com/recipes

      - run: aws cloudfront create-invalidation --distribution-id=$CLOUDFRONT_DISTRIBUTION_ID --paths '/recipes/*'
        env:
          CLOUDFRONT_DISTRIBUTION_ID: ${{ secrets.AWS_CLOUDFRONT_DISTRIBUTION_ID }}
```
