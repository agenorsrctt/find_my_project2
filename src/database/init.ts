import { db } from "./connection.js";

export async function generatedTables() {

    try {
        await db.execute(`create table if not exists organizations(
        id int auto_increment primary key,
        organization varchar(255) null,
        cnpj varchar(255) not null unique
        )`)

        await db.execute(`create table if not exists users(
        id int auto_increment primary key,
        user varchar(255) not null,
        email varchar(255) not null unique,
        password varchar(255) not null,
        type enum('student', 'admin', 'visitation', 'superAdmin') not null default 'visitation',
        organization_id int null,

        foreign key (organization_id) references organizations(id)
        )`)

        await db.execute(`create table if not exists projects(
        id int auto_increment primary key,
        project varchar(255) not null,
        description varchar(1000) not null,
        user_id int not null,
        date timestamp default current_timestamp,
        github_url varchar(255) not null,
        cover_img_url varchar(255) not null,

        foreign key (user_id) references users(id)
        )`)

        await db.execute(`create table if not exists project_imgs(
        id int auto_increment primary key,
        img_url varchar(255) not null,
        project_id int not null,

        foreign key (project_id) references projects(id),

        unique(project_id, img_url)
        )`)

        await db.execute(`create table if not exists technologies(
        id int auto_increment primary key,
        technology varchar(255) not null,
        project_id int not null,

        foreign key (project_id) references projects(id),
        
        unique(project_id, technology)
        )`)

        await db.execute(`create table if not exists upvotes(
        id int auto_increment primary key,
        project_id int not null,
        user_id int not null,

        foreign key (project_id) references projects(id),
        foreign key (user_id) references users(id),

        unique(user_id, project_id)
        )`)
        
        console.log("Tabelas criadas com sucesso!")
    } catch (error) {
        console.error("Error: " + error);
    }

}