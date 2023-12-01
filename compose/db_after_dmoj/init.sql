grant select on dmoj.judge_profile to 'webp'@'%';
grant select on dmoj.auth_user to 'webp'@'%';

create table dmoj.tsubuyaki (name varchar(150), ispublic INT, msg TEXT);
insert into dmoj.tsubuyaki value ("flag", 0, "ATGT{H0w_ab0u7_your_1st_SQL1}");
grant select on dmoj.tsubuyaki to 'webp'@'%';
grant insert on dmoj.tsubuyaki to 'webp'@'%';
