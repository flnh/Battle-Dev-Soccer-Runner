<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210608202918 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX IDX_32993751158E0B66');
        $this->addSql('CREATE TEMPORARY TABLE __temp__score AS SELECT id, target_id, resultat FROM score');
        $this->addSql('DROP TABLE score');
        $this->addSql('CREATE TABLE score (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, target_id INTEGER DEFAULT NULL, resultat INTEGER NOT NULL, CONSTRAINT FK_32993751158E0B66 FOREIGN KEY (target_id) REFERENCES target (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO score (id, target_id, resultat) SELECT id, target_id, resultat FROM __temp__score');
        $this->addSql('DROP TABLE __temp__score');
        $this->addSql('CREATE INDEX IDX_32993751158E0B66 ON score (target_id)');
        $this->addSql('CREATE TEMPORARY TABLE __temp__target AS SELECT id, first_name, last_name, pseudo, email, age, sex, family_composition, hobbies, token FROM target');
        $this->addSql('DROP TABLE target');
        $this->addSql('CREATE TABLE target (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, last_name VARCHAR(255) NOT NULL COLLATE BINARY, pseudo VARCHAR(255) NOT NULL COLLATE BINARY, email VARCHAR(255) NOT NULL COLLATE BINARY, age INTEGER NOT NULL, sex VARCHAR(255) NOT NULL COLLATE BINARY, token VARCHAR(255) NOT NULL COLLATE BINARY, first_name VARCHAR(255) NOT NULL, family_composition VARCHAR(255) NOT NULL, hobbies VARCHAR(255) NOT NULL)');
        $this->addSql('INSERT INTO target (id, first_name, last_name, pseudo, email, age, sex, family_composition, hobbies, token) SELECT id, first_name, last_name, pseudo, email, age, sex, family_composition, hobbies, token FROM __temp__target');
        $this->addSql('DROP TABLE __temp__target');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX IDX_32993751158E0B66');
        $this->addSql('CREATE TEMPORARY TABLE __temp__score AS SELECT id, target_id, resultat FROM score');
        $this->addSql('DROP TABLE score');
        $this->addSql('CREATE TABLE score (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, target_id INTEGER DEFAULT NULL, resultat INTEGER DEFAULT NULL)');
        $this->addSql('INSERT INTO score (id, target_id, resultat) SELECT id, target_id, resultat FROM __temp__score');
        $this->addSql('DROP TABLE __temp__score');
        $this->addSql('CREATE INDEX IDX_32993751158E0B66 ON score (target_id)');
        $this->addSql('CREATE TEMPORARY TABLE __temp__target AS SELECT id, first_name, last_name, pseudo, email, age, sex, family_composition, hobbies, token FROM target');
        $this->addSql('DROP TABLE target');
        $this->addSql('CREATE TABLE target (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, last_name VARCHAR(255) NOT NULL, pseudo VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, age INTEGER NOT NULL, sex VARCHAR(255) NOT NULL, token VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL COLLATE BINARY, family_composition VARCHAR(255) DEFAULT NULL COLLATE BINARY, hobbies VARCHAR(255) DEFAULT NULL COLLATE BINARY)');
        $this->addSql('INSERT INTO target (id, first_name, last_name, pseudo, email, age, sex, family_composition, hobbies, token) SELECT id, first_name, last_name, pseudo, email, age, sex, family_composition, hobbies, token FROM __temp__target');
        $this->addSql('DROP TABLE __temp__target');
    }
}
