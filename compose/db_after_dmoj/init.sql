grant select on dmoj.judge_profile to 'webp'@'%';
grant select on dmoj.auth_user to 'webp'@'%';

create table dmoj.tsubuyaki (name varchar(150), isprivate INT, msg TEXT);
insert into dmoj.tsubuyaki value ("flag", 1, "ATGT{THIS_IS_BLIND_SQLI}");
grant select on dmoj.tsubuyaki to 'webp'@'%';
grant insert on dmoj.tsubuyaki to 'webp'@'%';
