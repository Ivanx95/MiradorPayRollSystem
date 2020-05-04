create database pay_roll_system;

create  table if not exists users( 
	user_id int(10) primary key,
 	name varchar(45) not null,
 	rfc varchar(20),
 	curp varchar(20),
 	nss varchar(20),
 	antiquity date not null
 	 ) ;
alter table users add column supervisor_id int(10);

 alter table users add constraint user_supervsior_fk 
 foreign key users(supervisor_id)
 references users(user_id)
 on delete SET NULL  
 on update CASCADE;
