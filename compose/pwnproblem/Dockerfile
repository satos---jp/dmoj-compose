FROM ubuntu:23.04

RUN apt-get update && \
        apt-get -y upgrade && \
        apt-get install -y \
            xinetd \
            iproute2

# RUN apt-get install -y gcc vim 

# RUN apt-get install -y gdb

RUN groupadd -r user && useradd -r -g user user

COPY --chown=root:user ./build/start.sh /home/user/start.sh
COPY --chown=root:root ./build/ctf.conf /etc/xinetd.d/ctf
COPY --chown=root:user ./build/flag /home/user/flag
COPY --chown=root:user ./dist/hagaki_henkan /home/user/hagaki_henkan
# COPY --chown=root:user ./dist/main.c /home/user/main.c

# COPY --chown=root:user ./dist/libc.so.6 /home/user/libc.so.6

# COPY --chown=root:user ./cmd.sh /home/user/cmd.sh

WORKDIR /home/user

RUN chmod 444 ./flag && \
    chmod 555 ./hagaki_henkan && \
    chmod 555 ./start.sh && \
    chmod 444 /etc/xinetd.d/ctf

USER user
EXPOSE 31622

CMD ["xinetd","-dontfork","-f","/etc/xinetd.d/ctf"]

