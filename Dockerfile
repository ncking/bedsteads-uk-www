FROM node:22.2.0-alpine3.20
RUN apk add nano curl
WORKDIR /usr/src/app
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

## dockerignore is whitelist
## copy the files
COPY package.json package-lock.json ./
## npm ci wont run with symlinked/local devDependencies as the lock file will never match packag.json ... so just remove dev
RUN npm prune --production
RUN npm ci --omit=dev && npm cache clean --force
## copy the dirs
COPY ./ ./
CMD ["npm", "start"]