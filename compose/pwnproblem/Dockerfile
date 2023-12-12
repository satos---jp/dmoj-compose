FROM ubuntu:23.04

RUN apt-get update && \
        apt-get -y upgrade && \
        apt-get install -y \
            xinetd \
            iproute2

RUN groupadd -r user && useradd -r -g user user

RUN groupadd -r iknowgenchi && useradd -r -g iknowgenchi iknowgenchi
RUN printf "h1rakeg0ma\nh1rakeg0ma\n" | passwd iknowgenchi

COPY --chown=root:user ./build/start.sh /home/user/start.sh
COPY --chown=root:root ./build/ctf.conf /etc/xinetd.d/ctf
COPY --chown=root:user ./build/flag /home/user/flag
COPY --chown=root:user ./dist/hagaki_henkan /home/user/hagaki_henkan

COPY --chown=iknowgenchi:iknowgenchi ./build/genchi.jpg /home/user/genchi_post.jpg

WORKDIR /home/user

RUN chmod 400 ./genchi_post.jpg

RUN chmod 444 ./flag && \
    chmod 555 ./hagaki_henkan && \
    chmod 555 ./start.sh && \
    chmod 444 /etc/xinetd.d/ctf

USER user
EXPOSE 31622

CMD ["xinetd","-dontfork","-f","/etc/xinetd.d/ctf"]

