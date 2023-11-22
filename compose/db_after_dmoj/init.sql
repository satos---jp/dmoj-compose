grant select on dmoj.judge_profile to 'tes'@'%';
grant select on dmoj.auth_user to 'tes'@'%';

create table dmoj.hall_of_fame (id int, name varchar(150), msg TEXT);
insert into dmoj.hall_of_fame value (-1, "flag", "ATGT{H0w_ab0u7_your_1st_SQL1}");
grant select on dmoj.hall_of_fame to 'tes'@'%';
grant insert on dmoj.hall_of_fame to 'tes'@'%';
