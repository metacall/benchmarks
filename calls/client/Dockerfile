#
# MetaCall Benchmarks by Parra Studios
# Copyright (C) 2016 - 2020 Vicente Eduardo Ferrer Garcia <vic798@gmail.com>
#

# Benchmark wrk builder image
FROM alpine:3.9 AS builder

# Image descriptor
LABEL copyright.name="Vicente Eduardo Ferrer Garcia" \
	copyright.address="vic798@gmail.com" \
	maintainer.name="Vicente Eduardo Ferrer Garcia" \
	maintainer.address="vic798@gmail.com" \
	vendor="MetaCall Inc." \
	version="0.1"

# Environment variables
ENV LDFLAGS -static-libgcc
ENV CFLAGS -static-libgcc

# Install wrk dependencies
RUN apk add --no-cache --update --virtual .build-deps alpine-sdk openssl-dev git zlib-dev \
	&& git clone https://github.com/giltene/wrk2.git \
	&& cd wrk2 && make -j$(grep -c processor /proc/cpuinfo) \
	&& apk del .build-deps

# Benchmark wrk image
FROM alpine:3.9

# Image descriptor
LABEL copyright.name="Vicente Eduardo Ferrer Garcia" \
	copyright.address="vic798@gmail.com" \
	maintainer.name="Vicente Eduardo Ferrer Garcia" \
	maintainer.address="vic798@gmail.com" \
	vendor="MetaCall Inc." \
	version="0.1"

# Install wrk dependencies
RUN apk add --update openssl \
	&& apk add --no-cache ca-certificates

# Copy wrk executable
COPY --from=builder /wrk2/wrk /usr/bin

# Raise the limits to successfully run benchmarks
RUN ulimit -c -m -s -t unlimited

# Copy wrk scripts
COPY scripts /usr/bin

# Entry point
ENTRYPOINT ["/usr/bin/wrk"]
