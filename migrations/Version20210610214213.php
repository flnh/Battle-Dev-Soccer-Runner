<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210610214213 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE nb_tickets (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, score INTEGER NOT NULL, reward INTEGER NOT NULL)');
        $this->addSql('CREATE TABLE score (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, target_id INTEGER DEFAULT NULL, resultat INTEGER NOT NULL)');
        $this->addSql('CREATE INDEX IDX_32993751158E0B66 ON score (target_id)');
        $this->addSql('CREATE TABLE target (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, pseudo VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, age INTEGER NOT NULL, sex VARCHAR(255) NOT NULL, family_composition VARCHAR(255) NOT NULL, hobbies VARCHAR(255) NOT NULL, token VARCHAR(255) NOT NULL)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE nb_tickets');
        $this->addSql('DROP TABLE score');
        $this->addSql('DROP TABLE target');
    }
}
