create table
        request_log (
                id bigint not null auto_increment,
                origin varchar(512),
                url varchar(512),
                user_agent varchar(512),
                method varchar(255),
                path varchar(255),
                headers json,
                created_at datetime(6) not null,
                primary key (id)
        ) engine = InnoDB;
