FROM node:19-alpine AS build

COPY bin/install-libraries.sh /build/flux-studis-selfservice-frontend-build/libs/flux-studis-selfservice-frontend/bin/install-libraries.sh
RUN /build/flux-studis-selfservice-frontend-build/libs/flux-studis-selfservice-frontend/bin/install-libraries.sh

RUN ln -s libs/flux-studis-selfservice-frontend/bin /build/flux-studis-selfservice-frontend-build/bin && ln -s libs/flux-studis-selfservice-frontend/src /build/flux-studis-selfservice-frontend-build/src

COPY . /build/flux-studis-selfservice-frontend-build/libs/flux-studis-selfservice-frontend

RUN /build/flux-studis-selfservice-frontend-build/bin/generate-pwa.mjs

RUN cp -L -R /build/flux-studis-selfservice-frontend-build/libs/flux-studis-selfservice-frontend/src /build/flux-studis-selfservice-frontend && rm -rf /build/flux-studis-selfservice-frontend-build

FROM scratch

COPY --from=build /build /
