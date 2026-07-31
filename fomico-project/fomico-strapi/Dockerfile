FROM node:20-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json package-lock.json* ./
# Install full dependencies (including devDependencies like typescript,
# which are required to compile this TypeScript Strapi project)
RUN npm install
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN npm run build

# Remove devDependencies now that the build output exists, to keep the final image lean
RUN npm prune --omit=dev && npm cache clean --force

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
